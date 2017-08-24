import * as express from 'express';

import Index from './routes/indexRoute';
import WriteDatabaseRoute from './routes/writeDatabaseRoute';
import PiRoute from './routes/piRoute';
import AckermanRoute from './routes/ackermanRoute';
import BinarySearchRoute from './routes/binarySearchRoute';

export default function setRoutes(app) {

  const router = express.Router();

  const index = new Index();
  const writeDatabase = new WriteDatabaseRoute();
  const piRoute = new PiRoute();
  const ackermanRoute = new AckermanRoute();
  const binarySearchRoute = new BinarySearchRoute();

  router.use((req, res, next) => { req.startTime = Date.now(); next(); });

  router.route('/').get(index.show);
  router.route('/pi').post(piRoute.process); 
  router.route('/ackerman').post(ackermanRoute.process); 
  router.route('/writeDatabase').post(writeDatabase.process); 
  router.route('/binarySearch').post(binarySearchRoute.process); 

  // Apply the routes to our application with the prefix /api
  app.use('/', router); 
  
}
