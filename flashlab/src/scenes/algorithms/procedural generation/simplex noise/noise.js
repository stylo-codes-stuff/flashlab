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
        const {centerX,centerY} = this.cameras.main;
        this.noiseGraphics = this.add.graphics();
        var vectors = generateVectorTable(64)
        const width = this.scale.width;
        const height = this.scale.height;
        this.scaleFactor = .01
        const noiseTexture = this.textures.createCanvas('noise', width, height);
        const context = noiseTexture.getContext();
        var map = generateNoisemap(width,height,this.scaleFactor,vectors)
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
        this.noiseImage = this.add.image(0, 0, 'noise').setOrigin(0).setDisplaySize(width/3*2, height);
        noiseTexture.refresh();
        this.title = this.add.text((width/3*2)+(width/3)/2,50,'Noise Parameters').setOrigin(.5,.5)
        this.scaleText = this.add.text(width/3*2+110,centerY-25,'Scale Factor')
        this.scaleNum = this.add.text(width/3*2+140,centerY,this.scaleFactor)
        this.decrease = this.add.text(width/3*2+120,centerY,'-').setInteractive();
        this.increase = this.add.text(width/3*2+200,centerY,'+').setInteractive();
        this.newmap = this.add.text((width/3*2)+(width/3)/2,height-100,"Generate Noise Map").setOrigin(.5).setInteractive()
        this.increase.on('pointerup',()=>{
            if(this.scaleFactor +.01 <=1){
                this.scaleFactor += .01
                this.scaleNum.text = this.scaleFactor.toFixed(2)
            }
        })
        this.decrease.on('pointerup',()=>{
            if (this.scaleFactor-.01>=0){
                this.scaleFactor -= .01
                this.scaleNum.text = this.scaleFactor.toFixed(2)
            }
        })
        this.newmap.on('pointerup',()=>{
            map = generateNoisemap(width,height,this.scaleFactor,vectors)

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
            noiseTexture.refresh();
            
            
        })
    }
    update(){}
}