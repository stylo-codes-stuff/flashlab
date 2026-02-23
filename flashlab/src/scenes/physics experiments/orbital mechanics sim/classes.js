export class vector{
    constructor(direction,velocity){
        this.t = direction;
        this.v = velocity;
    }
    repr(){
        console.log(`velocity: ${this.v}\n direction: ${this.t}`)
    }
}


export class body extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,texture,starting_velocity,starting_direction,mass){
        super(scene,x,y,texture)
        scene.add.existing(this)
        this.vel_vec = new vector(starting_direction,starting_velocity)
        this.mass = mass
        this.static = false
        
    }
    //move according to the objects velocity vector
    move(dt){
        if (this.static == false){
        this.x += this.vel_vec.v * Math.cos(this.vel_vec.t * Math.PI/180) *dt
        this.y += this.vel_vec.v * Math.sin(this.vel_vec.t * Math.PI/180)  *dt
        }
    }
    
    //update the physics object by applying gravity forces from other objects

setSize(w, h){
    this.displayWidth = w
    this.displayHeight = h;
}


}