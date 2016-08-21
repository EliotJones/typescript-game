namespace Splods.ViewModels{
    export class SplodViewModel extends ViewModel{
        splod:Splods.Splod;
        game: Phaser.Game;

        constructor(game: Phaser.Game, splod: Splods.Splod) {
            let xOffset = Environment.TILESIZE / 2 - (Splods.SPLOD_INITIAL_SIZE / 2) + splod.tile.location.x;
            let yOffset = Environment.TILESIZE / 2 - (Splods.SPLOD_INITIAL_SIZE / 2) + splod.tile.location.y;

            super(game, 'young-splod', new Point(xOffset, yOffset), { width: 16, height: 16});
            this.splod = splod;
            this.splod.OnAge.on(x => this.aged());
            this.game = game;
        }

        private aged(){
            this.sprite.width += 2;
            this.sprite.height += 2;

            if (this.sprite.height === 24) {
                this.sprite.loadTexture('splod');
                this.sprite.width = 24;
                this.sprite.height = 24;
            }
            else if(this.sprite.height == 30){
                this.sprite.loadTexture('old-splod');
                this.sprite.width = 30;
                this.sprite.height = 30;
            }

            this.sprite.x -= 1;
            this.sprite.y -= 1;
            
            let emitter = this.game.add.emitter(this.sprite.x + this.sprite.width / 2, 
            this.sprite.y + this.sprite.height / 2);

            emitter.makeParticles('age-particle', 1, 5);

            emitter.explode(1000, 5);
        }
    }
}