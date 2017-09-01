import { Route, RouteUtil } from "./route";
import IO from "../tiers/io";
import { Status } from "../tiers/tier";

export default class IORoute implements Route {

    process(req: any, res: any): void {
        RouteUtil.processSynchronousRoute(req, res, new IO(), RouteUtil.getNextTiers(req.body));
    }

}