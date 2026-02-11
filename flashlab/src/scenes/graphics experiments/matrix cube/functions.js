export function createEmptyMatrix(rows, columns) {
    const matrix = [];
    for (let row = 0; row < rows; row++) {
        matrix.push([]);
        for (let column = 0; column < columns; column++) {
            matrix[row].push(0);
        }
    }
    return matrix;
}

export function dotProduct(v1, v2) {
    if (v1.length !== v2.length) {
        throw new Error("Lists must be of the same length.");
    }
    return v1.reduce((sum, a, i) => sum + a * v2[i], 0);
}

// 1d lists are treated as column vectors
export function multiplyMatrices(m1, m2) {
    const result = [];
    const columnMatrix = [];
    if (m1[0].length !== m2.length) {
        throw new Error(
            "The amount of columns in the first matrix, does not equal the amount of rows in the second matrix."
        );
    }
    // check if m2 is a column vector (1D array)
    if (!Array.isArray(m2[0])) {
        for (const row of m1) {
            result.push(dotProduct(row, m2));
        }
        return result;
    }
    // if not
    else {
        const resultMatrix = createEmptyMatrix(m1.length, m2[0].length);
        for (let rowIndex = 0; rowIndex < m2[0].length; rowIndex++) {
            columnMatrix.push(m2.map(row => row[rowIndex]));
        }
        for (let row = 0; row < m1.length; row++) {
            for (let column = 0; column < columnMatrix.length; column++) {
                resultMatrix[row][column] = dotProduct(m1[row], columnMatrix[column]);
            }
        }
        return resultMatrix;
    }
}

export function rotateX(vector, t) {
    const rx = [
        [1, 0, 0],
        [0, Math.cos(t), -Math.sin(t)],
        [0, Math.sin(t), Math.cos(t)]
    ];
    return multiplyMatrices(rx, vector);
}

export function rotateY(vector, t) {
    const ry = [
        [Math.cos(t), 0, Math.sin(t)],
        [0, 1, 0],
        [-Math.sin(t), 0, Math.cos(t)]
    ];
    return multiplyMatrices(ry, vector);
}

export function rotateZ(vector, t) {
    const rz = [
        [Math.cos(t), -Math.sin(t), 0],
        [Math.sin(t), Math.cos(t), 0],
        [0, 0, 1]
    ];
    return multiplyMatrices(rz, vector);
}

export function degrees(degrees) {
    return Math.PI / (180 / degrees);
}