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
        this.textStyle ={
            fontFamily: 'Arial',
            fontSize: '32px',
            color: '#000000',
            align: 'center',
            stroke: '#000000',
            strokeThickness: 2,
            shadow: { offsetX: 2, offsetY: 2, color: '#000000', blur: 5, fill: true }
        }
        //fps counter stuff
        this.point1 = new point(this,centerX-100,centerY-100,100,'point').setOrigin(.5,.5).setDisplaySize(10,10)
        this.point2 = new point(this,centerX+100,centerY+100,100,'point').setOrigin(.5,.5).setDisplaySize(10,10)
        this.point3 = new point(this,centerX+100,centerY-100,100,'point').setOrigin(.5,.5).setDisplaySize(10,10)
        this.point4 = new point(this,centerX-100,centerY+100,100,'point').setOrigin(.5,.5).setDisplaySize(10,10)
        this.point5 = new point(this,centerX-100,centerY-100,-100,'point').setOrigin(.5,.5).setDisplaySize(10,10)
        this.point6 = new point(this,centerX+100,centerY+100,-100,'point').setOrigin(.5,.5).setDisplaySize(10,10)
        this.point7 = new point(this,centerX+100,centerY-100,-100,'point').setOrigin(.5,.5).setDisplaySize(10,10)
        this.point8 = new point(this,centerX-100,centerY+100,-100,'point').setOrigin(.5,.5).setDisplaySize(10,10)
        //sliders
        this.sliderxGraphics = this.add.graphics();
        this.sliderxGraphics.fillStyle('#AAAAAA')
        this.sliderxKnob = this.add.sprite(100,centerY+216,'point')
        this.sliderxGraphics.fillRoundedRect(100-16, centerY+200,400,32,15)
        this.sliderxText = this.add.text(100+64,centerY+170,'X-axis rotation angle')
        this.slideryGraphics = this.add.graphics().setInteractive();
        this.sliderzGraphics = this.add.graphics().setInteractive();
        this.timespersecond = 1;
        this.elapsed = 0;
        this.fps = 0
        this.points = [this.point1,this.point2,this.point3,this.point4,this.point5,this.point6,this.point7,this.point8]
        this.graphics = this.add.graphics()
    }
    update(t,dt){
        const {centerX,centerY} = this.cameras.main
        for (let point in this.points){
            this.points[point].rotateZ(100)
            this.points[point].rotateY(.01)
            this.points[point].rotateX(.01)
        }
        this.graphics.clear()
        this.graphics.lineStyle(10,0x000000,1)
        
        //f1
        this.graphics.lineBetween(this.point1.x,this.point1.y,this.point3.x,this.point3.y)
        this.graphics.lineBetween(this.point3.x,this.point3.y,this.point2.x,this.point2.y)
        this.graphics.lineBetween(this.point2.x,this.point2.y,this.point4.x,this.point4.y)
        this.graphics.lineBetween(this.point4.x,this.point4.y,this.point1.x,this.point1.y)
        //f2
        this.graphics.lineBetween(this.point5.x,this.point5.y,this.point7.x,this.point7.y)
        this.graphics.lineBetween(this.point8.x,this.point8.y,this.point6.x,this.point6.y)
        this.graphics.lineBetween(this.point6.x,this.point6.y,this.point7.x,this.point7.y)
        this.graphics.lineBetween(this.point8.x,this.point8.y,this.point5.x,this.point5.y)
        //f3
        this.graphics.lineBetween(this.point1.x,this.point1.y,this.point5.x,this.point5.y)
        this.graphics.lineBetween(this.point2.x,this.point2.y,this.point6.x,this.point6.y)
        this.graphics.lineBetween(this.point3.x,this.point3.y,this.point7.x,this.point7.y)
        this.graphics.lineBetween(this.point4.x,this.point4.y,this.point8.x,this.point8.y)
        
        
        
        
        
        
        
        
        
        
        
    }
}