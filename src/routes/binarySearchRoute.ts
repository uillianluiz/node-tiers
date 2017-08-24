import { Route, RouteUtil } from "./route";
import BinarySearch from "../tiers/binarySearch";
import { Status } from "../tiers/tier";

export default class BinarySearchRoute implements Route {

    process(req: any, res: any): void {
        RouteUtil.processSynchronousRoute(req, res, new BinarySearch(), RouteUtil.getNextTiers(req.body));
    }

}