import { checkbox,textbox } from "./uiclasses";
export class UI2 extends Phaser.Scene {
    constructor() {
        super('ui');
    }
    preload(){
                this.load.spritesheet('checkbox', 'checkbox32x32.png', { 
            frameWidth: 32, // Width of each individual frame in pixels
            frameHeight: 32, // Height of each individual frame in pixels
            endFrame: 2 // Optional: The total number of frames to load
        });
    }

    create() {
        const {centerX,centerY} = this.cameras.main;
        //this.toggle = new checkbox(this,centerX,centerY,'test')
        //this.textbox = new textbox(this,50,50,'Click to enter text',null ,'test: ')
        this.background = this.add.graphics()
        this.Gtextbox = new textbox(this,centerX+250,100,'Click to enter text',null,'G: ')
        this.debugPhysics = new checkbox(this,100)
        this.background.fillStyle(0x000000,.5);
        this.background.fillRoundedRect(centerX+200,50,(this.scale.width/2)-250,this.scale.height-100,15)
        this.simulationParams = this.add.container(0,0,[this.background,this.Gtextbox]);
        this.simulationParams.hidden = false;
        this.simulationParams.tweening = false;
        this.simulationParams.ipos = {}
        this.toggleMenu = this.add.text(centerX,centerY,'toggle settings menu').setInteractive();
        

        this.toggleMenu.on('pointerup',()=>{
            if (this.simulationParams.tweening == false){
            if(this.simulationParams.hidden == true){
        this.tweens.add({
                targets:this.simulationParams,
                duration:2000,
                x:"-=800",
                ease:'Power2',
                onComplete:()=> {
                    this.simulationParams.hidden = false
                    this.simulationParams.tweening = false
                }

        })

        }
        if(this.simulationParams.hidden == false ){
        
        this.tweens.add({
                targets:this.simulationParams,
                duration:2000,
                x:"+=800",
                ease:'Power2',
                onComplete:()=> {
                    this.simulationParams.hidden = true
                    this.simulationParams.tweening = false
                    
                }
                })
            } 
                this.simulationParams.tweening = true;
                console.log(this.simulationParams.tweening)
}
    })
}
    update(t,dt) {
    }
}