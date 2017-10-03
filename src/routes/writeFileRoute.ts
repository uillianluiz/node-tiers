import { Route, RouteUtil } from "./route";
import WriteFile from "../tiers/writeFile";
import { Status } from "../tiers/tier";

export default class PiRoute implements Route {

    process(req: any, res: any): void {
        RouteUtil.processSynchronousRoute(req, res, new WriteFile(), RouteUtil.getNextTiers(req.body));
    }

}