import { _ } from 'underscore';
import math = require('mathjs');

export default class Util {

    public static arraysLength = 10000000;
    public static matrixSize = 300;
    public static dbElementSize = 64000;

    public static sortedArray = _.range(Util.arraysLength);
    public static unsortedArray = _.shuffle(_.range(Util.arraysLength));   

    /**
     * Function that generates a random number that works as input to the search algorithms.
     */
    public static randomNumber(): number{
        return _.random(0, Util.arraysLength);
    }

    /**
     * Generates a random string
     * @param length size of the generated random string
     */
    public static randomString(length: number) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(_.random(0, possible.length));
        }
        return text;
    }

    /**
     * Generates a random matrix using the mathjs library
     * @param m number of columns
     * @param n number of rows
     */
    public static randomMatrix(m = this.matrixSize, n = this.matrixSize){
        return math.random([m, n]);
    }

    public static randomVector(m = this.matrixSize){
        return math.random([m]);
    }
    
}