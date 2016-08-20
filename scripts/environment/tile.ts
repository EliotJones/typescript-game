namespace Splods.Environment{
    export class Tile{
        index: Point;
        location: Point;

        constructor(index: Point, location: Point) {
            this.index = index;
            this.location = location;
        }
    }
}