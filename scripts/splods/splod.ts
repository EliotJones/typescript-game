namespace Splods.Splods{
    export const SPLOD_INITIAL_SIZE = 16;

    export class Splod{
        private static maxGen : number = (Environment.TILESIZE - SPLOD_INITIAL_SIZE) / 2;
        private onAge = new LiteEvent<number>();
        
        public get OnAge() : ILiteEvent<number> { return this.onAge; }

        tile:Environment.Tile;
        generation:number;
        frames:number;

        constructor(tile:Environment.Tile) {
            this.tile = tile;  
            this.frames = 0;
            this.generation = 0;          
        }

        age() : void {
            if(this.generation == Splod.maxGen){
                return;
            }

            this.frames++;
            
            if(Math.floor(this.frames / 500) > this.generation){
                this.generation++;
                this.onAge.trigger(this.generation);
            }
        }
    }
}