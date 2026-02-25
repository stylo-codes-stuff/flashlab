import {
	randomChoice
} from "./random.js";
import {
	hashGrad
} from './functions.js';
import { generateVectorTable } from "./random.js";
import { generateNoisemap } from "./functions.js";
export class point {
	constructor(x, y, vectorSet) {
		this.G = (3 - Math.sqrt(3)) / 6;
		this.F = (Math.sqrt(3) - 1) / 2;
		this.x = x;
		this.y = y;

		// skew coordinates and set them as props
		const s = (x + y) * this.F;
		this.i = Math.floor(x + s);
		this.j = Math.floor(y + s);

		// Unskew cell origin for use in computation
		const t = (this.i + this.j) * this.G;
		this.X0 = this.i - t;
		this.Y0 = this.j - t;
		// local coords
		this.x0 = x - this.X0;
		this.y0 = y - this.Y0;
		this.vectors= vectorSet;
		this.noiseVal = this.getNoiseValue()
	}
	//get which half of the simplex the point lies in
	getSimplexOffsets() {
		if (this.x0 > this.y0) {
			return {
				i1: 1,
				j1: 0
			}; // lower triangle
		} else {
			return {
				i1: 0,
				j1: 1
			}; // upper triangle
		}
	}
	getNoiseValue() {
		var corners = this.getDistanceVectors()
		var {
			i1,
			j1
		} = this.getSimplexOffsets()
		var contributions = []
		//get each corners respective gradients
		const g0 = hashGrad(this.i, this.j, this.vectors)
		const g1 = hashGrad(this.i + i1, this.j + j1, this.vectors)
		const g2 = hashGrad(this.i + 1, this.j + 1, this.vectors)
		const grads = [g0, g1, g2];

		//use gradient vectors to calculate contribution;
		for (let k = 0; k < corners.length; k++) {
			const [dx, dy] = corners[k];
			let t = 0.5 - dx * dx - dy * dy;
			if (t <= 0) {
				contributions.push(0);
			} else {
				contributions.push((t ** 4) * this.dot(grads[k], dx, dy));
			}
		}
		return 70 * contributions.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
	}
	//get distance vectors for each corner using the simplexes local coordinates
	getDistanceVectors() {
		const {
			i1,
			j1
		} = this.getSimplexOffsets();

		const x1 = this.x0 - i1 + this.G;
		const y1 = this.y0 - j1 + this.G;

		const x2 = this.x0 - 1 + 2 * this.G;
		const y2 = this.y0 - 1 + 2 * this.G;

		return [
			[this.x0, this.y0],
			[x1, y1],
			[x2, y2]
		];
	}


	dot(grad, dx, dy) {
		return grad[0] * dx + grad[1] * dy;
	}

}
