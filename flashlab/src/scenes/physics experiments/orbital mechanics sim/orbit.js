import {getResultant,get_angle,gforce,distance} from './functions.js'
import {body,vector} from './classes.js'
export class orbit extends Phaser.Scene {
    constructor() {
        super('orbit');
    }
    preload(){
        this.load.image('sun','assets/physics assets/solar system/sun.png')
        this.load.image('mercury','assets/physics assets/solar system/mercury.png')
    }
    
    create() {
        //setup for physics bodies
        const {centerX,centerY} = this.cameras.main;
        this.elapsed = 0;
        this.windows = []
        this.graphics = this.add.graphics()
        this.graphics.lineStyle(10, 0x000000)
        this.pathpoints = [];
        this.physicsObjects = [];
        this.G = 2000
        this.reset = this.add.text(50,50,'reset planets').setInteractive();
        this.re
        this.sun = new body(this,centerX,centerY,'sun',0,0,400).setDisplaySize(100,100)
        this.sun.static = true
        this.mercury = new body(this,centerX,centerY+100,'mercury',75,0,100)
        this.b2 = new body(this,centerX,centerY-100,'mercury',-75,0,100).setDisplaySize(100,100)
        //static test bodies
        this.velocity = this.add.text(50,100,'')
        this.angletext = this.add.text(50,150,'')
        
        this.mercury.setSize(110,110)
        this.physicsObjects.push(this.sun,this.mercury,this.b2)
        this.elapsed = 0 ;
        this.reset.on('pointerup',()=>{
            this.mercury.x = centerX;
            this.mercury.y = centerY - 200;
            this.mercury.vel_vec.t = 0;
            this.mercury.vel_vec.v = 69;
        })
        //setup for side menus
        
        this.cameras.main.startFollow(this.mercury);
    }
    
    update(t,dt) {
        
        
        const dtSeconds = Math.min(dt / 1000, 0.02);
        
        
        this.physicsObjects.forEach(obj1=>{
            var g_vectors = []
            
            //generate vectors for the g force of all other bodies a
            this.physicsObjects.forEach(obj2=>{
                //skip if the second obj is the first to avoid error or if its static
                if(obj1 === obj2 || obj1.static == true ){
                    return
                }else{
                    var fg = gforce(obj1.mass,obj2.mass,this.G,distance(obj1.getCenter().x,obj1.getCenter().y,obj2.getCenter().x,obj2.getCenter().y))
                    var fa = (get_angle(obj1.getCenter().x,obj1.getCenter().y,obj2.getCenter().x,obj2.getCenter().y)+360) %360
                    var fv = new vector(fa,fg)
                    g_vectors.push(fv)
                }
                
            })   
            //euler integrtaion of acceleration using net force vector and object mass
            var netf = getResultant(g_vectors)
            netf.v = netf.v/obj1.mass;
            netf.v = netf.v * dtSeconds
            obj1.vel_vec = getResultant([obj1.vel_vec, netf]);
            this.velocity.text = `velocity: ${obj1.vel_vec.v}`
            this.angletext.text = `angle: ${obj1.vel_vec.t}`
            obj1.move(dtSeconds)
        })
        
        this.elapsed += dt
    }
}