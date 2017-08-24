import WriteDatabase from '../tiers/writeDatabase';
import { Status } from '../tiers/tier';
import { RouteUtil, Route } from "./route";

export default class WriteDatabaseRoute implements Route {

	public process(req: any, res: any): void {
		let nextTiers = RouteUtil.getNextTiers(req.body);
		let writeDatabase = new WriteDatabase();
		
		writeDatabase.execute((status: Status): void => {
			status.time = new Date().getTime() - req.startTime;
			status.tier = req.protocol + '://' + req.get('host') + req.originalUrl;

			RouteUtil.processNextTier(nextTiers, (nextTierStatus: Status) => {
				if(typeof nextTierStatus === 'object')
					status.children.push(nextTierStatus);
				
				res.json(status);
			});
		});
	}

}