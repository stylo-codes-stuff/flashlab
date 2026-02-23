//copy and paste this everytime you need to start a new scene

import { Scene } from 'phaser';

export class solarSystem extends Scene
{
    constructor ()
    {
        super('solarSystem');
    }
    preload(){
        this.load.image('sun','assets/physics assets/solar system/sun.png')
    }
    create ()
    {
        this.cameras.main.setBackgroundColor('#FFF8E7');
        const {centerX,centerY} = this.cameras.main
        this.sun = this.add.sprite(centerX,centerY,'sun').setDisplaySize(110,110)
    }
}