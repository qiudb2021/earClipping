export class Node {
    /** vertex index in coordinates array */
    protected _index: number;

    /** vertex coordinates */
    protected _x: number;
    protected _y: number;
    // z-order curve value
    protected _z: number;

    /** previous and next vertex nodes in a polygon ring */
    protected _prev: Node;
    protected _next: Node;

    protected _prevZ: Node;
    protected _nextZ: Node;

    protected _steiner: boolean;

    public static Create(index: number, x: number, y: number): Node {
        return new Node(index, x, y);
    }

    protected constructor(index: number, x: number, y: number) {
        this._index = index;
        this._x = x;
        this._y = y;
        this._z = <number><unknown>undefined;

        this._prev = <Node><unknown>null;
        this._next = <Node><unknown>null;

        this._prevZ = <Node><unknown>null;
        this._nextZ = <Node><unknown>null;

        this._steiner = false;
    }

    public get index(): number {return this._index;}
    public get x(): number {return this._x;}
    public get y(): number {return this._y;}

    public get prev(): Node {return this._prev;}
    public set prev(node: Node) {this._prev = node;}

    public get next(): Node {return this._next;}
    public set next(node: Node) {this._next = node;}

    public get prevZ(): Node {return this._prevZ;}
    public set prevZ(node: Node) {this._prevZ = node;}

    public get nextZ(): Node {return this._nextZ;}
    public set nextZ(node: Node) {this._nextZ = node;}
}