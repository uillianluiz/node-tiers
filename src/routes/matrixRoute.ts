import { Route, RouteUtil } from "./route";
import Matrix from "../tiers/matrix";
import { Status } from "../tiers/tier";

export default class MatrixRoute implements Route {

    process(req: any, res: any): void {
        RouteUtil.processSynchronousRoute(req, res, new Matrix(), RouteUtil.getNextTiers(req.body));
    }

}