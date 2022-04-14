"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var viewUtil_1 = require("../utils/viewUtil");
var marco_1 = require("../marco");
var EarCut = /** @class */ (function () {
    function EarCut() {
    }
    EarCut.done = function (vertexs, holes, dim) {
        if (dim === void 0) { dim = 2; }
        this.viewSimplePolygon(vertexs, true);
    };
    EarCut.viewSimplePolygon = function (vertexs, flag) {
        if (flag === void 0) { flag = false; }
        viewUtil_1.ViewUtil.drawPolyLine(vertexs, marco_1.COLORS.black, 2);
        if (flag) {
            for (var i = 0; i < vertexs.length - 1; i += 2) {
                var x = vertexs[i];
                var y = vertexs[i + 1];
                viewUtil_1.ViewUtil.drawCircle(x, y, 5, marco_1.COLORS.blue);
                viewUtil_1.ViewUtil.drawText(x, y + 10, "(" + x + "," + y + ")", marco_1.COLORS.black);
            }
        }
    };
    return EarCut;
}());
exports.EarCut = EarCut;
;
