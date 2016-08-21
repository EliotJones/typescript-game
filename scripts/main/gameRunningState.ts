namespace Splods.Main{
     export class GameRunningState extends Phaser.State {
        
        constructor() {
            super();
        }
        
        grid: Environment.Grid;
        gridViewModel: ViewModels.GridViewModel;
        gameManager: GameManager;

        preload(){
            this.load.image('tile', "resources/images/tile.png");
            this.load.image('grid', "resources/images/grid.png");
            this.load.image('splod', "resources/images/splod.png");
            this.load.image('young-splod', "resources/images/young-splod.png");
            this.load.image('old-splod', "resources/images/old-splod.png");
            this.load.image('age-particle', "resources/images/age-particle.png");
        }

        create() {
            this.grid = new Environment.Grid(this.game.width, this.game.height);
            this.gridViewModel = new ViewModels.GridViewModel(this.game, this.grid);
            this.gameManager = new GameManager(this.gridViewModel, this.grid, this.game);

            this.game.input.onDown.add(this.gameManager.click);
            this.game.input.addMoveCallback((pointer : Phaser.Pointer, x : number, y : number, isClick : boolean) => {
                this.gameManager.mouseMove(pointer, x, y, isClick);
            }, this);
        }

        update() {
            this.gameManager.update();
        }

        render() {
        }
    }
}