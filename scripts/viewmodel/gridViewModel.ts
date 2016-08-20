namespace Splods.ViewModels {
    export class GridViewModel extends ViewModel {
        tiles: TileViewModel[][];
        splods:SplodViewModel[];

        constructor(game: Phaser.Game, grid: Environment.Grid) {
            let location = new Point(0, 0);
            let size: Size = { width: game.width, height: game.height };
            
            super(game, 'grid', location, size);

            this.splods = [];
            this.tiles = [];

            for (let row = 0; row < grid.tiles.length; row++) {
                let tileRow = grid.tiles[row];
                this.tiles[row] = [];

                for (var column = 0; column < tileRow.length; column++) {
                    let tile = tileRow[column];

                    let tileSize: Size = { width: Environment.TILESIZE, height: Environment.TILESIZE };

                    this.tiles[row][column] = new TileViewModel(game, tile.location, tileSize, tile);
                }
            }
        }

        addSplod(game: Phaser.Game, splod:Splods.Splod){
            let splodViewModel = new SplodViewModel(game, splod);

            this.splods.push(splodViewModel);

            this.splods.push()
        }
    }
}