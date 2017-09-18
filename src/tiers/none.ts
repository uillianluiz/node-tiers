import { Tier, Status } from './tier';

/**
 * None tier
 * Main resources used: -
 */
export default class None extends Tier {
    constructor() {
        super();
    }


    protected executeTask(): Status {
        return new Status(`Ok, nothing executed.`, 200);
    }
}