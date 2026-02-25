import {randomChoice} from './random.js'
import {point} from './classes.js'

export function generateNoisemap(width, height, scale, vectorSet) {

    //generate a list of skewed points and assign each one a vector
    const points = []

    // offset coordinates to center around 0 for better symmetry
    const offsetX = -width / 2 * scale
    const offsetY = -height / 2 * scale

    for (let y = 0; y < height; y++) {
        points.push([])
        for (let x = 0; x < width; x++) {
            //scale points and add offset to get correct noise values
            points[y][x] = new point(
                x * scale + offsetX,
                y * scale + offsetY,
                vectorSet
            )
        }
    }
    return points
}
export function hashGrad(i, j, vectorSet) {

    // Fast 2D integer hash with avalanche mixing
    let hash = i * 374761393 + j * 668265263
    hash = (hash ^ (hash >> 13)) * 1274126177
    hash ^= hash >> 16

    const index = (hash & vectorSet.mask) * 2
    return [
        vectorSet.data[index],
        vectorSet.data[index + 1]
    ]
}

export function toHex(num) {
    // Validate input
    if (typeof num !== 'number' || !Number.isInteger(num)) {
        throw new TypeError('Input must be an integer.');
    }
    if (num < 0 || num > 255) {
        throw new RangeError('Input must be between 0 and 255 for a single byte.');
    }

    // Convert to hex and pad with leading zero if needed
    return num.toString(16)
}