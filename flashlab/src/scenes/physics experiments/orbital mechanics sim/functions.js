import {vector} from './classes.js'
export function getResultant(vectors){
    var rx = 0
    var ry = 0
    for(let vec of vectors){
        var xcomp = vec.v * Math.cos(radians(vec.t))
        var ycomp = vec.v * Math.sin(radians(vec.t))
        rx += xcomp
        ry += ycomp
    }
    var rm = Math.sqrt(rx**2+ry**2)
    var rt = (degrees(Math.atan2(ry,rx))+360) % 360
    return new vector(rt,rm)
}

export function radians(degrees){
    return degrees * (Math.PI/180)
}
export function degrees(radians){
    return radians/ (Math.PI/180)
}
export function distance(x1,y1,x2,y2){
    return Math.sqrt((x2-x1)**2 + (y2-y1)**2)
}
export function gforce(m1,m2,G,r){
    return (G*m1*m2)/r**2
}
export function get_angle(x1,y1,x2,y2){
    
    var dx = x2-x1
    var dy = y2-y1
    return (Math.atan2(dy,dx) *(180/Math.PI)+360) %360
     
}