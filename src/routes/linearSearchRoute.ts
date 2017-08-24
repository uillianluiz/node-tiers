import { Route, RouteUtil } from "./route";
import LinearSearch from "../tiers/linearSearch";
import { Status } from "../tiers/tier";

export default class BinarySearchRoute implements Route {

    process(req: any, res: any): void {
        RouteUtil.processSynchronousRoute(req, res, new LinearSearch(), RouteUtil.getNextTiers(req.body));
    }

}