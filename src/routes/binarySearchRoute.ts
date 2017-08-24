import { Route, RouteUtil } from "./route";
import BinarySearch from "../tiers/binarySearch";
import { Status } from "../tiers/tier";

export default class BinarySearchRoute implements Route {

    process(req: any, res: any): void {
        let nextTiers = RouteUtil.getNextTiers(req.body);
        let binarySearch = new BinarySearch();

        let status = <Status>binarySearch.execute();
        status.time = new Date().getTime() - req.startTime;
        status.tier = req.protocol + '://' + req.get('host') + req.originalUrl;
        
        RouteUtil.processNextTier(nextTiers, (nextTierStatus: Status) => {
            if(typeof nextTierStatus === 'object')
                status.children.push(nextTierStatus);
            
            res.json(status);
        });
    }

}