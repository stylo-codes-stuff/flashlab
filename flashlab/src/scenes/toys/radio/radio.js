//copy and paste this everytime you need to start a new scene

import { Scene } from 'phaser';
export class radio extends Scene
{
    constructor ()
    {
        super('radio');
    }
    preload(){
        this.load.image('radio','assets/toy assets/radio/radio.png')
        this.load.image('knob','assets/graphics assets/sliders/knob.png')
    }
    create ()
    {
        const {centerX,centerY} = this.cameras.main
        const context = this.sound.context
        const element = document.getElementById('radio');
        const resampler = []
        const track = context.createMediaElementSource(element);
        const gainNode = context.createGain();
        gainNode.gain.value = .01;
        track.connect(gainNode).connect(context.destination);
        
        context.audioWorklet.addModule('assets/audio/radio/audioProcessors/resample.js').then(() => {
            tresampler = new AudioWorkletNode(context, 'resampler', {
                processorOptions: {
                    reductionFactor: 10,  // higher = more crunchy
                    bitDepth:100     // lower = more distorted
                }
            });
            track
            .connect(resampler)
            .connect(gainNode)
            .connect(context.destination);
            
        });

        element.play()
        var radio = this.add.sprite(centerX,centerY,'radio').setDisplaySize(75,65)
        console(this.resampler.parameters)
        this.bitDepthGraphics  = this.add.graphics();
        this.bitDepthGraphics.fillStyle(0x000000)
        this.bitDepthslider = this.bitDepthGraphics.fillRoundedRect(100,centerY+300-16,400,32,15)
        this.bitDepthKnob = this.add.sprite(100,centerY+300,'knob').setInteractive({draggable:true})
        this.bitDepthText = this.add.text(100+150,centerY+260,'Bit depth: 0')
        this.bitDepthKnob.on('drag',(event,dragx,dragy)=>{
            this.bitDepthKnob.x = dragx;
            if(this.bitDepthKnob.x <98){
                this.bitDepthKnob.x = 100
            }
            if(this.bitDepthKnob.x>500){
                this.bitDepthKnob.x = 499;
                
            }
            this.bitDepthText.text =  `Bit depth: ${Math.round((this.bitDepthKnob.x-100)/400*100)}`
        })
    }
    update(t,dt){
        
    }
}