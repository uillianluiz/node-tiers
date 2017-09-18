import { Route, RouteUtil } from "./route";
import None from "../tiers/none";
import { Status } from "../tiers/tier";

export default class NoneRoute implements Route {

    process(req: any, res: any): void {
        RouteUtil.processSynchronousRoute(req, res, new None(), RouteUtil.getNextTiers(req.body));
    }

}