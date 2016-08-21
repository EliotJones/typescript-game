namespace Splods.ViewModels {
    export class GridViewModel extends ViewModel {
        tiles: TileViewModel[][];
        splods:SplodViewModel[][];
        currentTile: TileViewModel;
        grid: Environment.Grid;

        constructor(game: Phaser.Game, grid: Environment.Grid) {
            let location = new Point(0, 0);
            let size: Size = { width: game.width, height: game.height };
            
            super(game, 'grid', location, size);

            this.splods = [];
            this.tiles = [];
            this.grid = grid;
            this.grid.OnSplodCreated.on(splod => {
                this.addSplod(game, splod);
            })

            for (let row = 0; row < grid.tiles.length; row++) {
                let tileRow = grid.tiles[row];
                this.tiles[row] = [];
                this.splods[row] = [];

                for (var column = 0; column < tileRow.length; column++) {
                    let tile = tileRow[column];

                    let tileSize: Size = { width: Environment.TILESIZE, height: Environment.TILESIZE };

                    this.tiles[row][column] = new TileViewModel(game, tile.location, tileSize, tile);
                    this.splods[row][column] = null;
                }
            }
        }

        addSplod(game: Phaser.Game, splod:Splods.Splod) : void{
            let splodViewModel = new SplodViewModel(game, splod);
            splodViewModel.splod.OnKill.on(() => {
                splodViewModel.sprite.destroy();
                this.splods[splodViewModel.splod.tile.index.y][splodViewModel.splod.tile.index.x] = null;
            });

            this.splods[splod.tile.index.y][splod.tile.index.x] = splodViewModel;
        }

        informOfMouseLocation(x: number, y: number) : void{
            let row = Math.floor(y / Environment.TILESIZE);
            let column = Math.floor(x / Environment.TILESIZE);

            if (this.currentTile != null && this.currentTile.tile.index.x == column
            && this.currentTile.tile.index.y == row) {
                return;
            }

            if(this.currentTile != null){
                this.currentTile.sprite.tint = 0xFFFFFF;
            }
            
            this.currentTile = this.tiles[row][column];
            this.currentTile.sprite.tint = 0x41b9a9;
        }
    }
}