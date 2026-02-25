//copy and paste this everytime you need to start a new scene
import { generateNoisemap } from './functions';
import { Scene } from 'phaser';

export class SimplexNoise extends Scene
{
    constructor ()
    {
        super('simplex noise');
}
    
    create ()
    {
        this.noiseGraphics = this.add.graphics();
        const map = generateNoisemap(1000,1000)
        for (var y = 0; y<1000;y++){
            for(var x = 0;x<1000;x++){
                this.noiseGraphics.fillStyle(0xffffff,map[y][x].noiseVal)
                this.noiseGraphics.fillRect(x*10,y*10,10,10)
            }
        }
    }
}