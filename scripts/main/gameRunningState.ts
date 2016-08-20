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
        }

        create() {
            this.grid = new Environment.Grid(this.game.width, this.game.height);
            this.gridViewModel = new ViewModels.GridViewModel(this.game, this.grid);
            this.gameManager = new GameManager(this.gridViewModel, this.grid, this.game);

            this.game.input.onDown.add(this.gameManager.click);
        }

        update() {
            this.gameManager.update();
        }

        render() {
        }
    }
}