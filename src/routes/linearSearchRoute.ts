import { Route, RouteUtil } from "./route";
import LinearSearch from "../tiers/linearSearch";
import { Status } from "../tiers/tier";

export default class BinarySearchRoute implements Route {

    process(req: any, res: any): void {
        let nextTiers = RouteUtil.getNextTiers(req.body);
        let linearSearch = new LinearSearch();

        let status = RouteUtil.processSynchronousExecution(req, linearSearch);
        
        RouteUtil.processNextTier(nextTiers, (nextTierStatus: Status) => {
            if(typeof nextTierStatus === 'object')
                status.children.push(nextTierStatus);
            
            res.json(status);
        });
    }

}