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

        const context = new AudioContext();
        const element = document.getElementById('radio')
        const track = context.createMediaElementSource(element)
        track.connect(context.destination)
        context.audioWorklet.addModule('./resample.js').then(()=>{
            let resampler = new AudioWorkletNode(context,'resampler',{processorOptions:{reductionFactor:-1000},})
            resampler.connect(context.destination)
            element.play()
            
            
        })
        
    }
    update(t,dt){
        
    }
}