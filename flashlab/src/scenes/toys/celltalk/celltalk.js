//copy and paste this everytime you need to start a new scene

import { Scene } from 'phaser';

export class celltalk extends Scene
{
    constructor ()
    {
        super('celltalk');
    }
    
    create ()
    {
        //my version of andre michelles celltalk flash player toy
        const {centerX,centerY} = this.cameras.main
        this.add.text(centerX,centerY,'this is a template for future scenes')
    }
}