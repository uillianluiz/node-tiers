import { Tier, Status } from './tier';
import Util from './util';
import math = require('mathjs');

/**
 * Matrix tier
 * Main resources used: Memory, Cache, CPU
 */
export default class Matrix extends Tier {

    matrixSize: number;

    /**
     * execute a matrix multiplication over a random genenerated matrix and a random vector.
     * @param matrixSize Matrix size
     */
    constructor(matrixSize = Util.matrixSize) {
        super();
        this.matrixSize = matrixSize;
    }

    /**
     * Other matrix operations may be used, for that you can check: http://mathjs.org/docs/datatypes/matrices.html
     */
    protected executeTask(): Status {
        let matrix = Util.randomMatrix(this.matrixSize, this.matrixSize);
        let vector = Util.randomVector(this.matrixSize);
        math.multiply(matrix, vector);

        return new Status(`Matrix of size [${this.matrixSize},${this.matrixSize}] multiplied to vector of size [${this.matrixSize}]`);
    }

}
