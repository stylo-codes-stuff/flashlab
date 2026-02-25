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
        this.game.config.pixelArt = false;
        this.noiseGraphics = this.add.graphics();
        var vectors = generateVectorTable(64)
        const width = this.scale.width;
        const height = this.scale.height;
        
        const noiseTexture = this.textures.createCanvas('noise', width, height);
        const context = noiseTexture.getContext();
        const map = generateNoisemap(width,height,.01,vectors)
        const imageData = context.createImageData(width, height);
        const data = imageData.data;
        
        for (var y = 0; y<height;y++){
            //chose color and alpha level based on noise value
            for(var x = 0;x<width;x++){
                //get correct index for 1d image data array
                const idx = (y * width + x) * 4;
                const normalized = (map[y][x].noiseVal + 0.7) / 1.4;
                const color_val = Math.floor(normalized * 255);
                if (map[y][x].noiseVal > 0){
                    data[idx] = color_val;     
                    data[idx + 1] = color_val; 
                    data[idx + 2] = color_val; 
                }else{
                    data[idx] = 0;             
                    data[idx + 1] = 0;         
                    data[idx + 2] = color_val;
                }
                data[idx + 3] = 255; // Fully opaque
                
            }
        }
        context.putImageData(imageData, 0, 0);
        
        this.noiseCalcs = (width*3/2) + height
        console.log(this.noiseCalcs)
        // Add the canvas texture to the scene
        this.add.image(0, 0, 'noise').setOrigin(0).setDisplaySize(width/3*2, height);
        noiseTexture.refresh();
        
    }
    update(){}
}