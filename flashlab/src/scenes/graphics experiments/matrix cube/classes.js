import { multiplyMatrices } from "./functions";
export class point extends Phaser.GameObjects.Sprite{
    constructor(scene,x,y,z,texture){
        super(scene,x,y,texture)
        this.z = z;
        scene.add.existing(this)
    }
    rotateX(t) {
        const rx = [
            [1, 0, 0],
            [0, Math.cos(t), -Math.sin(t)],
            [0, Math.sin(t), Math.cos(t)]
        ];
        var resultant = multiplyMatrices(rx, [this.x,this.y,this.z]);
        this.x = resultant[0]
        this.y = resultant[1]
        this.z = resultant[2]
    }
    rotateY(vector, t) {
        const ry = [
            [Math.cos(t), 0, Math.sin(t)],
            [0, 1, 0],
            [-Math.sin(t), 0, Math.cos(t)]
        ];
        return multiplyMatrices(ry, vector);
    }
    rotateZ(vector, t) {
    const rz = [
        [Math.cos(t), -Math.sin(t), 0],
        [Math.sin(t), Math.cos(t), 0],
        [0, 0, 1]
    ];
    return multiplyMatrices(rz, vector);
}
}