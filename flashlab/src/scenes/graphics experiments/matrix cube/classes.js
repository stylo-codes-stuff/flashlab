import { multiplyMatrices } from "./functions";
export class point extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,z,texture){
        super(scene,x,y,texture)
        scene.add.existing(this)
        //property for z value
        this.z = z;
        //offsets coordinate values so the center of the cube is shifted to the screens center
        this.offsetx = scene.sys.game.config.width/2;
        this.offsety = scene.sys.game.config.height/2;
        
    }
    rotateX(t) {
        const rx = [
            [1, 0, 0],
            [0, Math.cos(t), -Math.sin(t)],
            [0, Math.sin(t), Math.cos(t)]
        ];
        var x1 = this.x - this.offsetx;
        var y1 = this.y - this.offsety;
        var resultant = multiplyMatrices(rx, [x1,y1,this.z]);
        this.x = resultant[0] + this.offsetx
        this.y = resultant[1] + this.offsety
        this.z = resultant[2]
    }
    rotateY(t) {
        const ry = [
            [Math.cos(t), 0, Math.sin(t)],
            [0, 1, 0],
            [-Math.sin(t), 0, Math.cos(t)]
        ];
        var x1 = this.x - this.offsetx;
        var y1 = this.y - this.offsety;
        var resultant = multiplyMatrices(ry, [x1,y1,this.z]);
        this.x = resultant[0] + this.offsetx
        this.y = resultant[1] + this.offsety
        this.z = resultant[2]   
    }
    rotateZ(t) {
    const rz = [
        [Math.cos(t), -Math.sin(t), 0],
        [Math.sin(t), Math.cos(t), 0],
        [0, 0, 1]
    ];
        var x1 = this.x - this.offsetx;
        var y1 = this.y - this.offsety;
        var resultant = multiplyMatrices(rz, [x1,y1,this.z]);
        this.x = resultant[0] + this.offsetx
        this.y = resultant[1] + this.offsety
        this.z = resultant[2] 
    }
}