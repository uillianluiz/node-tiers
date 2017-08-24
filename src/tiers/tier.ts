
class NextTier {
    url: string;
    requestSize: number;
}

/**
 * Status class that wrappes the possible message and codes generate by the tiers
 */
class Status {
    message: string;
    code: number;
    tier: string | NextTier;
    children: Status[];

    /**
     * 
     * @param message Message that describes the execution and is passed to following tiers
     * @param code Optional code that can be used to describe the success of the execution
     */
    constructor(message: string, code = 200){
        this.message = message;
        this.code = code;
        this.children = [];
    }
}

abstract class Tier {
    /**
     * method that must be implemented in the children classes in order to execute the specific task
     * @param params optional parameter which may used to modify the execution of the task
     */
    protected abstract executeTask(params?: any): Status | void;

    /**
     * wrapper method that executes the task
     * @param params optional parameter which may used to modify the execution of the task
     */
    public execute(params?: any): Status | void {
        let status = this.executeTask(params);
        return status;
    }
}

export { Status, Tier, NextTier };