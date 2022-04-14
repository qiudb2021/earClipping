import { ViewUtil } from "../utils/viewUtil";
import { COLORS } from "../marco";

export class EarCut {
    public static done(vertexs: number[], holes: number[], dim:number = 2) {
        this.viewSimplePolygon(vertexs, true);
    }

    public static viewSimplePolygon(vertexs: number[], flag: boolean = false): void {
        ViewUtil.drawPolyLine(vertexs, COLORS.black, 2)
        if (flag) {
            for (let i = 0; i < vertexs.length - 1; i += 2) {
                let x = vertexs[i];
                let y = vertexs[i+1];
                ViewUtil.drawCircle(x, y, 5, COLORS.blue);
                ViewUtil.drawText(x, y + 10, "("+x+","+y+")", COLORS.black)
            }
        }
    }

};