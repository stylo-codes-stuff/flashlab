
function randomChoice(array){
    return array[randomInt(0,array.length-1)]
}
function randomInt(min, max) {
  // Use Math.floor(Math.random() * (max - min + 1)) + min to get an inclusive range
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
