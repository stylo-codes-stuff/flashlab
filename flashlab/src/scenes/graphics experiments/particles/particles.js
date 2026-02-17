//copy and paste this everytime you need to start a new scene

import { Scene } from 'phaser';

export class particles extends Scene
{
    constructor ()
    {
        super('particles');
    }
    
    create ()
    {
        const {centerX,centerY} = this.cameras.main;
        this.particles = 
        this.particleGraphics = this.add.graphics();
        this.particleGraphics.fillStyle(0xFFFFFF);
        this.particleGraphics.fillRect(centerX,centerY,20,20.);
        
    }
    update(){
        this.particleGraphics.x += 1
        this.particleGraphics.rotation += Phaser.Math.DegToRad(1)
    }
}