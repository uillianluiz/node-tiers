import { Route, RouteUtil } from "./route";
import Pi from "../tiers/pi";
import { Status } from "../tiers/tier";

export default class PiRoute implements Route {

    process(req: any, res: any): void {
        let nextTiers = RouteUtil.getNextTiers(req.body);
        let pi = new Pi();

        let status = <Status>pi.execute();
        status.time = new Date().getTime() - req.startTime;
        status.tier = req.protocol + '://' + req.get('host') + req.originalUrl;
        
        RouteUtil.processNextTier(nextTiers, (nextTierStatus: Status) => {
            if(typeof nextTierStatus === 'object')
                status.children.push(nextTierStatus);
            
            res.json(status);
        });
    }

}