import { ViewUtil } from "../utils/viewUtil";
import { COLORS } from "../marco";
import { LinkList } from "./linkList";
import { Node } from "./node";

export class EarCut {
    public static done(vertices: number[], holes: number[], dim:number = 2): number[] {
        this.viewSimplePolygon(vertices, true);

        // 多边形是否含有洞
        let hasHoles = holes && holes.length;

        let outerLen = hasHoles ? holes[0] * dim : vertices.length;

        let outerNode = this.linkedList(vertices, 0, outerLen, dim, true);

        // 打印循环队列
        // let curNode = outerNode
        // do {
        //     curNode = curNode.next;
        //     console.log("(%d,%d)", curNode.x, curNode.y);
        // } while (!this.equals(curNode, outerNode))
        
        let triangles: number[] = [];
        if (!outerNode || outerNode.next == outerNode.prev) return triangles;


        if (!outerNode) {
            return triangles;
        }

        // let minX: number, minY, maxX, maxY, x, y, invSize;
        // // if the shap is not too simple, we will use z-order curve hash later; calculate polygon bbox
        // if (vertices.length > 80 * dim) {
        //     console.log("TODO the shap is not too simple")
        // }

        // this.earcutLinked(outerNode, triangles, dim, minX, minY, invSize);
        console.log("hasHoles", hasHoles)
        return triangles;
    }

    public static viewSimplePolygon(vertices: number[], flag: boolean = false): void {
        ViewUtil.drawPolyLine(vertices, COLORS.black, 2)
        if (flag) {
            for (let i = 0; i < vertices.length - 1; i += 2) {
                let x = vertices[i];
                let y = vertices[i+1];
                ViewUtil.drawCircle(x, y, 5, COLORS.blue);
                ViewUtil.drawText(x, y + 10, "("+x+","+y+")", COLORS.black)
            }
        }
    }

    /** create a circular doubly linked list from polygon points in the specified winding order. */
    protected static linkedList(vertices: number[], start: number, end: number, dim: number, clockwise: boolean) {
        let last: Node = <Node><unknown>null;

        if (clockwise === (this.signedArea(vertices, start, end, dim) > 0)) {
            for (let i = start; i < end; i += dim) {
                last = this.insertNode(i, vertices[i], vertices[i+1], last)
            } 
        } else {
            for (let i = end - dim; i >= start; i -= dim) {
                last = this.insertNode(i, vertices[i], vertices[i+1], last);
            }
        }

        if (last && this.equals(last, last.next)) {
            console.log(last)
            this.removeNode(last);
            last = last.next;
        }
        return last;
    }

    protected static earcutLinked(outerNode: Node, triangles: number[], dim: number, minX: number, minY: number, invSize: number) {

    }

    protected static signedArea(vertices: number[], start: number, end: number, dim: number): number {
        let sum = 0;
        for (let i = start, j = end - dim; i < end; i += dim) {
            sum += (vertices[j] - vertices[i]) * (vertices[i + 1] + vertices[j + 1]);
            j = i;
        }
        return sum;
    }

    protected static insertNode(index: number, x: number, y: number, last: Node): Node {
        let node = Node.Create(index, x, y);
        if (!last) {
            node.prev = node;
            node.next = node;
        } else {
            node.next = last.next;
            node.prev = last;

            last.next.prev = node;
            last.next = node;
        }
        return node;
    }

    protected static removeNode(p: Node): void {
        p.next.prev = p.prev;
        p.prev.next = p.next;

        if(p.prevZ) p.prevZ.nextZ = p.nextZ
        if(p.nextZ) p.nextZ.prevZ = p.prevZ;
    }

    protected static equals(node1: Node, node2: Node): boolean {
        return node1.x === node2.x && node1.y === node2.y
    }
};