namespace Splods.ViewModels{

    export class TileViewModel extends ViewModel {
        
        tile: Environment.Tile;

        constructor(game: Phaser.Game, location: Point, 
        size: Size,
        tile: Environment.Tile) {
            super(game, 'tile', location, size);
            this.tile = tile;
        }
    }
}