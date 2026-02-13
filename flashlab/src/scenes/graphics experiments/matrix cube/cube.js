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
        //x angle slider code
        this.sliderxGraphics = this.add.graphics();
        this.sliderxGraphics.fillStyle('#AAAAAA')
        this.sliderxKnob = this.add.sprite(100,centerY+216,'point').setInteractive({draggable:true})
        this.sliderxGraphics.fillRoundedRect(100-16, centerY+200,400,32,15)
        this.sliderxText = this.add.text(100+64,centerY+170,'X-axis rotation angle: 0')
        //y angle slider code
        this.slideryGraphics = this.add.graphics()
        this.slideryGraphics.fillStyle(0xaaaaaa)
        this.slideryKnob = this.add.sprite(100,centerY+316,'point').setInteractive({draggable:true})
        this.slideryGraphics.fillRoundedRect(100-16,centerY+300,400,32,15)
        this.slideryText = this.add.text(100+64,centerY+270,'Y-axis rotation angle: 0 ')
        //z angle slider code
        this.sliderzGraphics = this.add.graphics()
        this.sliderzGraphics.fillStyle()
        this.sliderzKnob = this.add.sprite(600,centerY+216,'point').setInteractive({draggable:true})
        this.sliderzGraphics.fillRoundedRect(600-16,centerY+200,400,32,15)
        this.sliderzText = this.add.text(600+64,centerY+170,'Z-axis rotation angle: 0')
        //slider code for rotation speed
        this.speedGraphics = this.add.graphics()
        this.speedGraphics.fillStyle();
        this.speedknob = this.add.sprite(600,centerY+316,'point').setInteractive({draggable:true})
        this.speedGraphics.fillRoundedRect(600-16,centerY+300,400,32,15)
        this.speedText = this.add.text(600+64,centerY+270,'Rotations per second: 0')
        //other props
        this.xangle = 0;
        this.yangle = 0;
        this.zangle = 0;
        this.timespersecond = 1;
        this.elapsed = 0;
        this.fps = 0
        this.points = [this.point1,this.point2,this.point3,this.point4,this.point5,this.point6,this.point7,this.point8]
        this.graphics = this.add.graphics()
        this.elased = 0;
        //slider event listeners
        this.sliderxKnob.on('drag',(event,dragx,dragy)=>{
            this.sliderxKnob.x = dragx
            if(this.sliderxKnob.x<98){
                this.sliderxKnob.x = 100
            }
            if (this.sliderxKnob.x >470){
                this.sliderxKnob.x = 469
            }
            this.xangle = Math.round((this.sliderxKnob.x-100)/370*30)
            this.sliderxText.text = `X-axis rotation angle: ${this.xangle}`
        })
        this.slideryKnob.on('drag',(event,dragx,dragy)=>{
            this.slideryKnob.x = dragx;
            if(this.slideryKnob.x<98){
                this.slideryKnob.x = 98;
            }
            if(this.slideryKnob.x>470){
                this.slideryKnob.x = 469
            }
            //this.slideryText = this.add.text(100+64,centerY+270,'Y-axis rotation angle: 0 ')
            
            this.yangle = Math.round((this.slideryKnob.x-100)/370*30);
            this.slideryText.text = `Y-axis rotation angle: ${this.yangle}` 
        });
        this.sliderzKnob.on('drag',(event,dragx,dragy)=>{
            this.sliderzKnob.x = dragx;
            if(this.sliderzKnob.x<600){
                this.sliderzKnob.x = 601
            }
            if(this.sliderzKnob.x>971){
                this.sliderzKnob.x = 970;
            }
            this.zangle = Math.round((this.sliderzKnob.x-600)/370*30)
            //this.sliderzGraphics.fillRoundedRect(600-16,centerY+200,400,32,15)
            
            this.sliderzText.text = `Z-axis rotation angle ${this.zangle}`
        })
        this.speedknob.on('drag',(event,dragx,dragy)=>{
            this.speedknob.x = dragx;
            if(this.speedknob.x<600){
                this.speedknob.x = 601
            }
            if(this.speedknob.x>971){
                this.speedknob.x = 970;
            }
            this.speed = Math.round((this.speedknob.x-600)/370*60)
            this.speedText.text = `Rotations per Second: ${this.speed}`
        })
    }
    update(t,dt){
        const {centerX,centerY} = this.cameras.main
        this.elapsed += dt;
        if (this.elapsed >1000/this.speed ){

            for (let point in this.points){
                this.points[point].rotateX(this.xangle *(Math.PI/180))
                this.points[point].rotateY(this.yangle *(Math.PI/180))
                this.points[point].rotateZ(this.zangle *(Math.PI/180))
                
            }
            this.elapsed = 0;
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
        //f4
        this.graphics.lineBetween(this.point3.x,this.point3.y,this.point7.x,this.point7.y)
        this.graphics.lineBetween(this.point4.x,this.point4.y,this.point8.x,this.point8.y)   
    }
}