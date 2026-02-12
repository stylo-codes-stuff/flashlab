//copy and paste this everytime you need to start a new scene

import { Scene } from 'phaser';

export class sliders extends Scene
{
    constructor ()
    {
        super('sliders');
    }
    preload(){
        this.load.image('knob','assets/graphics assets/sliders/knob.png')
        this.load.image('slider','assets/graphics assets/sliders/slider.png')
        
    }
    create ()
    {
        const {centerX,centerY} = this.cameras.main;
        this.slider = this.add.graphics();
        this.slider.fillStyle('#AAAAAA')
        this.percent = this.add.text(centerX,centerY,'Percent: 0')
        this.slider.fillRoundedRect(centerX,centerY-10,400,32,15)
        this.knob = this.add.sprite(centerX,centerY,'knob').setInteractive({draggable:true})
        this.knob.on('drag',(event,dragx,dragy)=>{
            if(this.knob.x <=centerX+400 && this.knob.x>= centerX){
                this.knob.x = dragx;
                
            }
            if (this.knob.x <centerX){
                this.knob.x = centerX+1
            }
            if(this.knob.x>centerX+400){
                this.knob.x = centerX +399
            }
            this.percent.text = `Percent: ${Math.round(((this.knob.x-centerX)/400)*100)}`
        })
        
    }
}