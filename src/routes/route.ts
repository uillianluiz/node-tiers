import fetch = require('node-fetch');
import { Status, NextTier, Tier } from "../tiers/tier";
import Util from "../tiers/util";


interface Route {
    /**
	 * Route which executes the tiers
	 * @param req express request paramater
	 * @param res express response parameter
	 */
    process(req: any, res: any): void;
}

export default abstract class RouteUtil {

    /**
     * The request body should be a JSON in the following format:
     *  { "nextTiers": [ { "url": "http://localhost/TIER_ID1", "requestSize": 100}, ...,  { "url": "url", "requestSize": X}] }
     */

    /**
     * 
     * @param body request body
     */
    public static getNextTiers(body: any): NextTier[] {
        let nextTiers = [];
        if(typeof body === 'object' && body.hasOwnProperty('nextTiers')){
			nextTiers = <NextTier[]>(body.nextTiers);
		}
        return nextTiers;
    }

    /**
     * Execute the tier task and calls the function to execute the next tiers.
	 * @param req express request paramater
	 * @param res express response parameter
     * @param tier Tier object that contains the execute method
     * @param nextTiers NextTier array that contains the next tier configurations
     */
    public static processSynchronousRoute(req: any, res: any, tier: Tier, nextTiers: NextTier[]): void {
        let status = <Status>tier.execute();
        status.time = new Date().getTime() - req.startTime;
        status.tier = req.protocol + '://' + req.get('host') + req.originalUrl;

        RouteUtil.processNextTier(nextTiers, (nextTierStatus: Status) => {
            if(typeof nextTierStatus === 'object')
                status.children.push(nextTierStatus);
            
            res.json(status);
        });
    }

    /**
     * Function that makes the execution of the following tiers that are in queue. 
     * It generates a random data, with the defined request size, which is sent to stress the network
     * @param nextTiers Array of next tiers. 
     */
    public static processNextTier(nextTiers: NextTier[], fn: (json: Status) => void): void{
        if(typeof nextTiers !== 'object' || nextTiers.length === 0){
            fn(undefined); return;
        }

        let currentTier = nextTiers[0];
        nextTiers.splice(0, 1); //remove first element (which is currently being processed)
        fetch(currentTier.url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                "nextTiers": nextTiers,
                "requestSize": Util.randomString(currentTier.requestSize)
            })
        }).then((response) => {
            return response.json();
        }).then((status: Status) => {
            status.tier = currentTier;
            fn(status);
        }).catch((err) => {
            let errStatus = new Status("There was an error while calling fetch.", 500);
            errStatus.tier = currentTier;
            fn(errStatus);
        });
    }

}

export { NextTier, RouteUtil, Route };