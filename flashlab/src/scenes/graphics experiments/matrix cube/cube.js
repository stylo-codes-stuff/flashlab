//copy and paste this everytime you need to start a new scene
import { Scene } from 'phaser';
import { point } from './classes';

export class matrixCube extends Scene
{
    constructor ()
    {
        super('matrixCube');
    }
    
    preload(){
        this.load.image('point','assets/graphics assets/matrix cube/point.png')
        this.load.start()
    }
    create ()
    {
        
        //game code
        const {centerX,centerY} = this.cameras.main
        this.point1 = new point(this,centerX,centerY,1,'point')
        console.log(this.point1.x)
    }
    update(){
        console.log(this.point1.x)
        
        this.point1.rotateY(10)
        
    }
}