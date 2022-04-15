"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var viewUtil_1 = require("../utils/viewUtil");
var marco_1 = require("../marco");
var node_1 = require("./node");
var EarCut = /** @class */ (function () {
    function EarCut() {
    }
    EarCut.done = function (vertices, holes, dim) {
        if (dim === void 0) { dim = 2; }
        this.viewSimplePolygon(vertices, true);
        // 多边形是否含有洞
        var hasHoles = holes && holes.length;
        var outerLen = hasHoles ? holes[0] * dim : vertices.length;
        var outerNode = this.linkedList(vertices, 0, outerLen, dim, true);
        console.log;
        var curNode = outerNode;
        do {
            curNode = curNode.next;
            console.log("(%d,%d)", curNode.x, curNode.y);
        } while (!this.equals(curNode, outerNode));
        var triangles = [];
        if (!outerNode) {
            return triangles;
        }
        // let minX: number, minY, maxX, maxY, x, y, invSize;
        // // if the shap is not too simple, we will use z-order curve hash later; calculate polygon bbox
        // if (vertices.length > 80 * dim) {
        //     console.log("TODO the shap is not too simple")
        // }
        // this.earcutLinked(outerNode, triangles, dim, minX, minY, invSize);
        console.log("hasHoles", hasHoles);
        return triangles;
    };
    EarCut.viewSimplePolygon = function (vertices, flag) {
        if (flag === void 0) { flag = false; }
        viewUtil_1.ViewUtil.drawPolyLine(vertices, marco_1.COLORS.black, 2);
        if (flag) {
            for (var i = 0; i < vertices.length - 1; i += 2) {
                var x = vertices[i];
                var y = vertices[i + 1];
                viewUtil_1.ViewUtil.drawCircle(x, y, 5, marco_1.COLORS.blue);
                viewUtil_1.ViewUtil.drawText(x, y + 10, "(" + x + "," + y + ")", marco_1.COLORS.black);
            }
        }
    };
    /** create a circular doubly linked list from polygon points in the specified winding order. */
    EarCut.linkedList = function (vertices, start, end, dim, clockwise) {
        var last = null;
        if (clockwise === (this.signedArea(vertices, start, end, dim) > 0)) {
            for (var i = start; i < end; i += dim) {
                last = this.insertNode(i, vertices[i], vertices[i + 1], last);
            }
        }
        else {
            for (var i = end - dim; i >= start; i -= dim) {
                last = this.insertNode(i, vertices[i], vertices[i + 1], last);
            }
        }
        if (last && this.equals(last, last.next)) {
            console.log(last);
            this.removeNode(last);
            last = last.next;
        }
        return last;
    };
    EarCut.earcutLinked = function (outerNode, triangles, dim, minX, minY, invSize) {
    };
    EarCut.signedArea = function (vertices, start, end, dim) {
        var sum = 0;
        for (var i = start, j = end - dim; i < end; i += dim) {
            sum += (vertices[j] - vertices[i]) * (vertices[i + 1] + vertices[j + 1]);
            j = i;
        }
        return sum;
    };
    EarCut.insertNode = function (index, x, y, last) {
        var node = node_1.Node.Create(index, x, y);
        if (!last) {
            node.prev = node;
            node.next = node;
        }
        else {
            node.next = last.next;
            node.prev = last;
            last.next.prev = node;
            last.next = node;
        }
        return node;
    };
    EarCut.removeNode = function (p) {
        p.next.prev = p.prev;
        p.prev.next = p.next;
        if (p.prevZ)
            p.prevZ.nextZ = p.nextZ;
        if (p.nextZ)
            p.nextZ.prevZ = p.prevZ;
    };
    EarCut.equals = function (node1, node2) {
        return node1.x === node2.x && node1.y === node2.y;
    };
    return EarCut;
}());
exports.EarCut = EarCut;
;
