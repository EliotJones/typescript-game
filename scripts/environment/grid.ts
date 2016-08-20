namespace Splods.Environment{
    export const TILESIZE : number = 32;
    
    export class Grid{

        tiles: Tile[][];
        splods: Splods.Splod[][];

        constructor(x: number, y: number) {
            let columns = Math.floor(x / TILESIZE);
            let rows = Math.floor(y / TILESIZE);

            this.createGrid(columns, rows);
        }

        private createGrid(columns: number, rows: number) : void {
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

        public getTileAtLocation(location: Point) : Tile {
            let x = Math.floor(location.x / TILESIZE);
            let y = Math.floor(location.y / TILESIZE);

            return this.tiles[y][x];            
        }

        public getSplodOnTile(tile: Tile) : Splods.Splod {
            return this.splods[tile.index.y][tile.index.x];
        }

        public addSplod(splod:Splods.Splod){
            this.splods[splod.tile.index.y][splod.tile.index.x] = splod;
        }

        public informOfAge(){
            for (var row = 0; row < this.splods.length; row++) {
                for (var column = 0; column < this.splods[row].length; column++) {
                    let splod = this.splods[row][column];
                    
                    if (splod !== null) {
                        splod.age();
                    }
                }
                
            }
        }
    }
}