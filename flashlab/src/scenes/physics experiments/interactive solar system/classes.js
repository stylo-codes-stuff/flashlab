

class physbody extends Phaser.GameObjects.Sprite
{
    constructor(scene,x,y,texture,velocity,direction,ga,direction){
        super(scene,x,y,texture)
        //constant for the gravitational acceleration this body exerts on other bodies
        //this is in pixel per second (p/s)
        this.ga = ga
        this.velocity = velocity

    }
    
}