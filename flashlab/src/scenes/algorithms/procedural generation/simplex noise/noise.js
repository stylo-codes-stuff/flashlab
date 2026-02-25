//copy and paste this everytime you need to start a new scene
import { generateNoisemap } from './functions';
import { Scene } from 'phaser';
import { generateVectorTable } from './random';
import { toHex } from './functions';

export class SimplexNoise extends Scene
{
    constructor ()
    {
        super('simplex noise');
    }
    
    create ()
    {
        this.noiseGraphics = this.add.graphics();
        var vectors = generateVectorTable(64)
        var length = 1000
        var width = 1000
        const map = generateNoisemap(width,length,.05,vectors)
        for (var y = 0; y<length;y++){
            //chose color and alpha level based on noise value
            for(var x = 0;x<width;x++){
                const normalized = (map[y][x].noiseVal + 0.7) / 1.4;
                const color_val = Math.floor(normalized * 255);
                if (map[y][x].noiseVal > 0){
                    this.color_val = Phaser.Display.Color.GetColor(color_val,color_val,color_val)
                    
                    this.noiseGraphics.fillStyle(this.color_val,1)
                    this.noiseGraphics.fillRect(x*5,y*5,5,5)
                }else{
                    this.color_val = Phaser.Display.Color.GetColor(0,0,color_val)
                    
                    this.noiseGraphics.fillStyle(this.color_val,1)
                    this.noiseGraphics.fillRect(x*5,y*5,5,5)
                    
                    
                }
            }
        }
    }
}