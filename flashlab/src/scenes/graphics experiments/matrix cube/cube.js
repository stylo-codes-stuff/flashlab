//copy and paste this everytime you need to start a new scene
import { rotateX,rotateY,rotateZ } from './functions';
import { Scene } from 'phaser';

export class template extends Scene
{
    constructor ()
    {
        super('template');
    }
    
    create ()
    {
        const {centerX,centerY} = this.cameras.main
        this.add.text(centerX,centerY,'this is a template for future scenes')
    }
}