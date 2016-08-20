module Splods.Main{
    export class TitleScreenState extends Phaser.State {
        game: Phaser.Game;
        constructor() {
            super();
        }
        titleScreenImage: Phaser.Sprite;

        preload() {
            this.load.image("logo", "resources/cheeky-jeremy.jpg");
        }

        create() {
            this.titleScreenImage = this.add.sprite(0, 0, 'logo');
        
            this.input.onTap.addOnce(this.titleClicked, this); // <-- that um, this is extremely important
        }

        titleClicked (){
            this.game.state.start("GameRunningState");
        }
    }
}