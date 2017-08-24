import { Tier, Status } from './tier';

/**
 * Pi tier
 * Main resources used: CPU
 */
export default class Pi extends Tier {
    /**
     * 
     * @param precision indicates the precision that will be used to generate pi. The higher the number, the longer it takes to execute
     */
    protected executeTask(precision = 100000): Status {
        var p16 = 1, pi = 0;
        for (var k = 0; k <= precision; k++) {
            pi += 1.0 / p16 * (4.0 / (8 * k + 1) - 2.0 / (8 * k + 4) - 1.0 / (8 * k + 5) - 1.0 / (8 * k + 6));
            p16 *= 16;
        }
        return new Status(`The value of PI is: ${ pi }`, 200);
    }
}