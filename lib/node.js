"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Node = /** @class */ (function () {
    function Node(index, x, y) {
        this._index = index;
        this._x = x;
        this._y = y;
        this._z = undefined;
        this._prev = null;
        this._next = null;
        this._prevZ = null;
        this._nextZ = null;
        this._steiner = false;
    }
    Node.Create = function (index, x, y) {
        return new Node(index, x, y);
    };
    Object.defineProperty(Node.prototype, "index", {
        get: function () { return this._index; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "x", {
        get: function () { return this._x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "y", {
        get: function () { return this._y; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "prev", {
        get: function () { return this._prev; },
        set: function (node) { this._prev = node; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "next", {
        get: function () { return this._next; },
        set: function (node) { this._next = node; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "prevZ", {
        get: function () { return this._prevZ; },
        set: function (node) { this._prevZ = node; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "nextZ", {
        get: function () { return this._nextZ; },
        set: function (node) { this._nextZ = node; },
        enumerable: true,
        configurable: true
    });
    return Node;
}());
exports.Node = Node;
