namespace Splods.Environment {
    export const TILESIZE: number = 32;

    export class Grid {
        private splodCreated = new LiteEvent<Splods.Splod>();
        public get OnSplodCreated() : ILiteEvent<Splods.Splod> { return this.splodCreated };

        public tiles: Tile[][];
        public splods: Splods.Splod[][];

        public constructor(x: number, y: number) {
            let columns = Math.floor(x / TILESIZE);
            let rows = Math.floor(y / TILESIZE);

            this.createGrid(columns, rows);
        }

        private createGrid(columns: number, rows: number): void {
            let arr = [];
            this.tiles = [];
            this.splods = [];

            for (let i = 0; i < rows; i++) {
                this.tiles[i] = [];
                this.splods[i] = [];
                for (let j = 0; j < columns; j++) {
                    let location = new Point(j * TILESIZE, i * TILESIZE);
                    let index = new Point(j, i);

                    this.tiles[i][j] = new Tile(index, location);
                    this.splods[i][j] = null;
                }
            }
        }

        public getTileAtLocation(location: Point): Tile {
            let x = Math.floor(location.x / TILESIZE);
            let y = Math.floor(location.y / TILESIZE);

            return this.tiles[y][x];
        }

        public getSplodOnTile(tile: Tile): Splods.Splod {
            return this.splods[tile.index.y][tile.index.x];
        }

        public addSplod(splod: Splods.Splod) {
            this.splods[splod.tile.index.y][splod.tile.index.x] = splod;
        }

        public informOfFrame() {
            for (let row = 0; row < this.splods.length; row++) {
                for (let column = 0; column < this.splods[row].length; column++) {
                    let splod = this.splods[row][column];

                    if (splod != null) {
                        splod.age();
                    }
                }
            }

            this.calculateGrowth();
        }

        private calculateGrowth() {
            let checked : boolean[][] = [];
            for (let row = 0; row < this.tiles.length; row++) {
                checked[row] = [];
                for (let column = 0; column < this.tiles[row].length; column++) {
                    checked[row][column] = false;                    
                }                
            }

            for (let row = 0; row < this.splods.length; row++) {
                for (let column = 0; column < this.splods[row].length; column++) {
                    if(this.splods[row][column] == null){
                        continue;
                    }
                    
                    let splod = this.splods[row][column];

                    let neighbours = this.getNeighbours(row, column);

                    let neighbouringSplods = neighbours.filter(point => {
                        return this.splods[point.y][point.x] != null
                        && this.splods[point.y][point.x].generation > 5;
                    }).length;

                    if(neighbouringSplods == 4 && splod.generation < Splods.Splod.maxGen){
                        console.log('removing splod at x,y', column, row);
                        this.splods[row][column].kill();
                        this.splods[row][column] = null;
                    }

                    this.checkGrowthIntoLocations(neighbours, checked);
                }
            }
        }

        private checkGrowthIntoLocations(points:Point[], checked: boolean[][]){
            for (let i = 0; i < points.length; i++) {
                let point = points[i];
                
                if (checked[point.y][point.x] || this.splods[point.y][point.x] != null) {
                    continue;
                }

                let myNeighbours = this.getNeighbours(point.y, point.x);

                let vote = 0;
                let splodNeighbours = myNeighbours.filter(element => {
                    return this.splods[element.y][element.x] != null
                    && this.splods[element.y][element.x].generation > 5;
                });        

                if (splodNeighbours.length == 2) {
                    let splod = new Splods.Splod(this.tiles[point.y][point.x]);
                    this.splods[point.y][point.x] = splod;
                    this.splodCreated.trigger(splod);
                }

                checked[point.y][point.x] = true;
            }
        }

        private getNeighbours(row: number, column: number): Point[] {
            let neighbours: Point[] = [];

            if (row > 0) { neighbours.push(new Point(column, row - 1)); }
            if (row < this.tiles.length - 2) { neighbours.push(new Point(column, row + 1)); }

            if (column > 0) { neighbours.push(new Point(column - 1, row)); }
            if (column < this.tiles[row].length - 2) { neighbours.push(new Point(column + 1, row)); }

            return neighbours;
        }
    }
}