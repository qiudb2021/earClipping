import { EarCut } from "./lib/earCut";

const { graphical } = require('graphical');

graphical(8111); // listen on port 8111

EarCut.done([500,500, 600,600, 700,520, 780,570, 880,430, 764,445, 730,350, 640,535, 540,480, 550,375], [], 2);
