namespace Splods.Main{
    export class GameManager{
        
        gridViewModel: ViewModels.GridViewModel;
        grid: Environment.Grid;
        game: Phaser.Game;

        constructor(gridViewModel: ViewModels.GridViewModel, grid: Environment.Grid, game: Phaser.Game) {
            this.gridViewModel = gridViewModel;
            this.grid = grid;
            this.game = game;     
        }

        click = (event: MouseEvent) => {
            let clickLocation = new Point(this.game.input.mousePointer.x, this.game.input.mousePointer.y);

            let clickedTile = this.grid.getTileAtLocation(clickLocation);

            let currentSplod = this.grid.getSplodOnTile(clickedTile);

            if(currentSplod !== null){
                console.debug("Clicked tile is occupied.");
                return;
            }

            let splod = new Splods.Splod(clickedTile);

            this.grid.addSplod(splod);

            this.gridViewModel.addSplod(this.game, splod);
        }

        update(){
            this.grid.informOfAge();
        }
    }
}