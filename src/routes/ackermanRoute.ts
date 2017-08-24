import { Route, RouteUtil } from "./route";
import Ackerman from "../tiers/ackerman";
import { Status } from "../tiers/tier";

export default class AckermanRoute implements Route {

    process(req: any, res: any): void {
        RouteUtil.processSynchronousRoute(req, res, new Ackerman(), RouteUtil.getNextTiers(req.body));
    }

}