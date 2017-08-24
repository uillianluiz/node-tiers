import { Tier, Status } from './tier';
import Util from './util';
import math = require('mathjs');

/**
 * Matrix tier
 * Main resources used: Memory, Cache, CPU
 */
export default class Matrix extends Tier {

    matrixSize: number;
    arraysLength: number;
    constructor(matrixSize = Util.matrixSize, arraysLength = Util.arraysLength){
        super();
        this.matrixSize = matrixSize;
        this.arraysLength = arraysLength;
    }

    /**
     * execute a matrix multiplication over a random genenerated matrix and a random vector.
     * The size of the matrix impacts the performance.
     * Also, other matrix operations may be used, for that you can check: http://mathjs.org/docs/datatypes/matrices.html
     */
    protected executeTask(): Status {
        let matrix = Util.randomMatrix(this.matrixSize, this.matrixSize);
        let vector = Util.randomVector(this.arraysLength);
        math.multiply(matrix, vector);
        
        return new Status(`Matrix of size [${this.matrixSize},${this.matrixSize}] multiplied to vector of size [${this.arraysLength}]`);
    }

}
