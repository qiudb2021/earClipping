"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var earCut_1 = require("./lib/earCut");
var graphical = require('graphical').graphical;
graphical(8111); // listen on port 8111
earCut_1.EarCut.done([500, 500, 600, 600, 700, 520, 780, 570, 880, 430, 764, 445, 730, 350, 640, 535, 540, 480, 550, 375], [], 2);
