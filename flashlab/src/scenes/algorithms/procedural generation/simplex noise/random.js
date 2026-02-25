
export function randomChoice(array){
    return array[randomInt(0,array.length-1)]
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generatePermutationTable(){
    var perms = []
    for(var i =0;i<256;i++){
        perms.push(randomInt(0,256))
    }
    return perms
}
