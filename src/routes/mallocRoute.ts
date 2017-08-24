import { Route, RouteUtil } from "./route";
import Malloc from "../tiers/malloc";
import { Status } from "../tiers/tier";

export default class MallocRoute implements Route {

    process(req: any, res: any): void {
        RouteUtil.processSynchronousRoute(req, res, new Malloc(), RouteUtil.getNextTiers(req.body));
    }

}