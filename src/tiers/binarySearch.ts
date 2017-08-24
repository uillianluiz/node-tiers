import { Tier, Status } from './tier';
import Util from './util';

/**
 * Binary Search tier
 * Main resources used: Memory (random access) and cache
 */
export default class BinarySearch extends Tier {
    
    goal: number;
    constructor(goal = Util.randomNumber()){
        super();
        this.goal = goal;
    }

    /**
     * 
     * @param goal number that will be searched in the array. By default it uses a random generated number.
     * This function uses as search array the sorted array found at the class Util. 
     * The size of the array and the goal number impact in the performance of the search. However, it is way faster than linear search.
     */
    protected executeTask(): Status {
        let index = this.binarySearch(Util.sortedArray, this.goal);
        if(index !== -1){
            return new Status(`The value ${ this.goal } was found in the sorted array in the index ${ index }.`);
        }
        return  new Status(`The value ${ this.goal } was not found in the sorted array.`);
    }

    /**
     * It executes a binary search in a sorted array
     * @param array array that will be used for the search
     * @param goal number that will be searched
     */
    private binarySearch(array: [number], goal: number): number {
        let low = 0, high = array.length-1, mid;
        while(low < high){
            mid = Math.ceil(low + (high-low)/2);
            if(array[mid] == goal) return mid;
            else if(array[mid] > goal) high = mid;
            else low = mid;
        }
        return -1;
    }

}