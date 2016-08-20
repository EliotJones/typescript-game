namespace Splods.ViewModels{
    export class SplodViewModel extends ViewModel{
        splod:Splods.Splod;

        constructor(game: Phaser.Game, splod: Splods.Splod) {
            let xOffset = Environment.TILESIZE / 2 - (Splods.SPLOD_INITIAL_SIZE / 2) + splod.tile.location.x;
            let yOffset = Environment.TILESIZE / 2 - (Splods.SPLOD_INITIAL_SIZE / 2) + splod.tile.location.y;

            super(game, 'splod', new Point(xOffset, yOffset), { width: 16, height: 16});
            this.splod = splod;
            this.splod.OnAge.on(x => this.aged());
        }

        private aged(){
            this.sprite.width += 2;
            this.sprite.height += 2;
            this.sprite.x -= 1;
            this.sprite.y -= 1;
        }
    }
}