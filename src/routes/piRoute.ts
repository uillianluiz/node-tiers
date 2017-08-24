import { Route, RouteUtil } from "./route";
import Pi from "../tiers/pi";
import { Status } from "../tiers/tier";

export default class PiRoute implements Route {

    process(req: any, res: any): void {
        RouteUtil.processSynchronousRoute(req, res, new Pi(), RouteUtil.getNextTiers(req.body));
    }

}