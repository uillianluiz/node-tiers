import { Tier, Status } from './tier';
import Util from './util';

/**
 * Linear Search tier
 * Main resources used: Memory (sequential access) and cache
 */
export default class LinearSearch extends Tier {
    
    goal: number;
    constructor(goal = Util.randomNumber()){
        super();
        this.goal = goal;
    }

    /**
     * 
     * @param goal number that will be searched in the array. By default it uses a random generated number.
     * This function uses as search array the unsorted array found at the class Util. The size of the array and the goal number impact in the performance of the search.
     */
    protected executeTask(): Status {
        let index = this.linearSearch(Util.unsortedArray, this.goal);
        if(index !== -1){
            return new Status(`The value ${ this.goal } was found in the unsorted array in the index ${ index }.`);
        }
        return  new Status(`The value ${ this.goal } was not found in the unsorted array.`);
    }

    /**
     * It executes a linear search in an unsorted array
     * @param array array that will be used for the search
     * @param goal number that will be searched
     */
    private linearSearch(array: [number], goal: number): number {
        for(let i=0; i<array.length; i++){
            if(array[i] === goal) return i;
        }
        return -1;
    }

}