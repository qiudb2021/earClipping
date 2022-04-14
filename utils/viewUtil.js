"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Graphical = require("graphical");
var ViewUtil = /** @class */ (function () {
    function ViewUtil() {
    }
    ViewUtil.drawPolyLine = function (vertexs, color, width) {
        var len = vertexs.length;
        for (var i = 0; i < len; i += 2) {
            this.drawLine(vertexs[i % len], vertexs[(i + 1) % len], vertexs[(i + 2) % len], vertexs[(i + 3) % len], color, width);
        }
    };
    ViewUtil.drawLine = function (x0, y0, x1, y1, color, width) {
        if (width === void 0) { width = 1; }
        var line = new Graphical.Line();
        line.setPos(x0, y0);
        line.setPos2(x1, y1);
        line.setColor(color);
        line.setWidth(width);
    };
    ViewUtil.drawCircle = function (x, y, r, color) {
        var circle = new Graphical.Circle();
        circle.setPos(x, y);
        circle.setRadius(r);
        circle.setColor(color);
    };
    ViewUtil.drawText = function (x, y, context, color, size) {
        if (size === void 0) { size = 10; }
        var text = new Graphical.Text();
        text.setText(context);
        text.setPos(x, y);
        var front = "bold " + size + "px Arial";
        text.setFont(front);
        text.setColor(color);
        // text.setOutlineWidth(1);
        // text.setOutlineColor("black")
    };
    return ViewUtil;
}());
exports.ViewUtil = ViewUtil;
