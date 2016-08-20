namespace Splods.ViewModels{
    export abstract class ViewModel{
        sprite: Phaser.Sprite;
        location: Point;

        constructor(game: Phaser.Game, sprite: string, location : Point, size: Size) {
            this.sprite = game.add.sprite(location.x, location.y, sprite);
            this.sprite.width = size.width;
            this.sprite.height = size.height; 
        }
    }
}