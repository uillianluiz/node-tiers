import WriteDatabase from '../tiers/writeDatabase';
import { Status } from '../tiers/tier';
import Route from "./route";

export default class WriteDatabaseRoute {

	/**
	 * Route which executes the WriteDatabase tier
	 * @param req express request paramater
	 * @param res express response parameter
	 */
	public process(req: any, res: any): void {
		let writeDatabase = new WriteDatabase();
		let nextTiers = Route.getNextTiers(req.body);
		
		writeDatabase.execute((status: Status): void => {

			Route.processNextTier(nextTiers, (nextTierStatus: Status) => {
				if(typeof nextTierStatus === 'object')
					status.children.push(nextTierStatus);

				status.tier = req.protocol + '://' + req.get('host') + req.originalUrl;;
				res.json(status);
			});
		});
	}

}