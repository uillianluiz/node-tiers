import { Route, RouteUtil } from "./route";
import ZLib from "../tiers/zlib";
import { Status } from "../tiers/tier";

export default class ZLibRoute implements Route {

    process(req: any, res: any): void {
        RouteUtil.processSynchronousRoute(req, res, new ZLib(), RouteUtil.getNextTiers(req.body));
    }

}