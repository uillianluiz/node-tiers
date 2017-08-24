import { Tier, Status } from './tier';

/**
 * Ackerman tier
 * Main resources used: CPU
 */
export default class Ackerman extends Tier {

    m: number;
    n: number;

    /**
     * 
     * @param m First parameter of ackerman function
     * @param n Second parameter of ackerman function
     * Be aware of the size of the input parameters since it is easy to exceed the stack size.
     */
    constructor(m = 3, n=7){
        super();
        this.m = m;
        this.n = n;
    }

    protected executeTask(): Status {
        let result =  this.ackerman(this.m, this.n) || -1;
        let statusCode = result != -1 ? 200 : 500;
        return new Status(`The value of Ackerman for (${this.m}, ${this.n}) is: ${ result }`, statusCode);
    }

    /**
     * ackerman function from https://en.wikipedia.org/wiki/Ackermann_function
     * @param m 
     * @param n 
     */
    private ackerman(m: number, n: number): number{
        try{
            if(m === 0) return n+1;
            else if(m > 0 && n == 0) return this.ackerman(m-1, 1);
            else if(m > 0 && n> 0) return this.ackerman(m-1, this.ackerman(m, n-1));
        }catch(exception){
            console.error("RangeError: Maximum call stack size exceeded. Try a lower input parameters.")
            return -1;
        }
    }
}