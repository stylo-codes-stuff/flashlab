import {randomChoice} from './random.js'
import {point} from './classes.js'
export function generateNoisemap(width,height){
    const F = (Math.sqrt(3) - 1) / 2;
    const G = (3 - Math.sqrt(3)) / 6;
    var vectors = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]] 
    //generate a list of skewed points and assign each one a vector
    var points = []
    for(var y = 0;y<height;y++){
        points.push([])
        for (var x = 0;x<width;x++){
            points[y][x] = new point(x,y,vectors,F,G)
        }
    }
    return points
}
export function hashGrad(i,j,vectorSet){
    const hash = i*374761393 + j*668265263;
    const index = ((hash % vectorSet.length) + vectorSet.length) % vectorSet.length;
    return vectorSet[index];

}