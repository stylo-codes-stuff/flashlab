class particle extends Phaser.GameObjects.Graphics{
    constructor(scene,x,y,xspeed,yspeed,color){
        super(scene,x,y)
        this.xspeed = xspeed;
        this.yspeed = yspeed;
        this.color = color;
        
    }
}