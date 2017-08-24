import { Tier, Status } from './tier';
import Util from './util';
import math = require('mathjs');

/**
 * Matrix tier
 * Main resources used: Memory, Cache, CPU
 */
export default class Matrix extends Tier {

    /**
     * execute a matrix multiplication over a random genenerated matrix and a random vector.
     * The size of the matrix impacts the performance.
     * Also, other matrix operations may be used, for that you can check: http://mathjs.org/docs/datatypes/matrices.html
     */
    protected executeTask(): Status {
        let matrix = Util.randomMatrix();
        let vector = Util.randomVector();
        math.multiply(matrix, vector);
        
        return new Status(`Matrix of size [${matrix.length},${matrix[0].length}] multiplied to vector of size [${vector.length}]`);
    }

}
