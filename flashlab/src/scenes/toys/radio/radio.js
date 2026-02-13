//copy and paste this everytime you need to start a new scene

import { Scene } from 'phaser';
export class radio extends Scene
{
    constructor ()
    {
        super('radio');
    }
    preload(){
        
    }
    create ()
    {
        
        const context = this.sound.context
        const element = document.getElementById('radio');
        
        const track = context.createMediaElementSource(element);
        
        context.audioWorklet.addModule('resample.js').then(() => {
            const resampler = new AudioWorkletNode(context, 'resampler', {
                processorOptions: {
                    reductionFactor: 121,  // higher = more crunchy
                    bitDepth: 100          // lower = more distorted
                }
            });
            
            track.connect(resampler);
            resampler.connect(context.destination);
            
        });
        element.play()
        
    }
    update(t,dt){
        
    }
}