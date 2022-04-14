import { COLORS } from "../marco";

const Graphical = require("graphical");

export class ViewUtil {
    public static drawPolyLine(vertexs: number[], color: COLORS, width?: number): void {
        let len = vertexs.length;
        for (let i = 0; i < len; i+=2) {
            this.drawLine(vertexs[i%len], vertexs[(i+1)%len], vertexs[(i+2)%len], vertexs[(i+3)%len], color, width);
        }
    }
    
    public static drawLine(x0: number, y0: number, x1: number, y1: number, color: COLORS, width: number = 1): void {
        let line = new Graphical.Line();
        line.setPos(x0, y0);
        line.setPos2(x1, y1);
        line.setColor(color);
        line.setWidth(width);
    }

    public static drawCircle(x: number, y: number, r: number, color: COLORS): void {
        let circle = new Graphical.Circle();
        circle.setPos(x, y);
        circle.setRadius(r);
        circle.setColor(color);
    }

    public static drawText(x: number, y: number, context: string, color: COLORS, size: number = 10) {
        let text = new Graphical.Text();
        text.setText(context);
        text.setPos(x, y);
        let front = "bold "+ size + "px Arial";
        text.setFont(front);
        text.setColor(color);
        // text.setOutlineWidth(1);
        // text.setOutlineColor("black")
    }
}