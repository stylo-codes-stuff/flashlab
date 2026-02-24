
class node{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.valid = randomInt(1,2) == 1;
        this.f = Infinity;
        this.g = Infinity;
        this.cameFrom = null
        
    }
}