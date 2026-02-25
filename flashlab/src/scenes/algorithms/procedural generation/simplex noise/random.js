
export function randomChoice(array){
    return array[randomInt(0,array.length-1)]
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateVectorTable(count = 64) {
    const size = 1 << Math.ceil(Math.log2(count));
    const mask = size - 1;

    const data = new Float32Array(size * 2);

    for (let i = 0; i < size; i++) {
        const angle = (i / size) * Math.PI * 2;
        data[i * 2]     = Math.cos(angle);
        data[i * 2 + 1] = Math.sin(angle);
    }

    return { data, mask };
}