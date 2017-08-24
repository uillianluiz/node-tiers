import { Route, RouteUtil } from "./route";
import LinearSearch from "../tiers/linearSearch";
import { Status } from "../tiers/tier";

export default class BinarySearchRoute implements Route {

    process(req: any, res: any): void {
        let nextTiers = RouteUtil.getNextTiers(req.body);
        let linearSearch = new LinearSearch();

        let status = <Status>linearSearch.execute();
        status.time = new Date().getTime() - req.startTime;
        status.tier = req.protocol + '://' + req.get('host') + req.originalUrl;


        //let status = RouteUtil.processSyncronousExecution(req, res, linearSearch);
        
        RouteUtil.processNextTier(nextTiers, (nextTierStatus: Status) => {
            if(typeof nextTierStatus === 'object')
                status.children.push(nextTierStatus);
            
            res.json(status);
        });
    }

}