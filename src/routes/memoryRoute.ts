import { Route, RouteUtil } from "./route";
import Memory from "../tiers/memory";
import { Status } from "../tiers/tier";

export default class MemoryRoute implements Route {

    process(req: any, res: any): void {
        RouteUtil.processSynchronousRoute(req, res, new Memory(), RouteUtil.getNextTiers(req.body));
    }

}