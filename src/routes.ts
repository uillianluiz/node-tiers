import * as express from 'express';

import Index from './routes/index';
import WriteDatabase from './routes/writeDatabase';

export default function setRoutes(app) {

  const router = express.Router();

  const index = new Index();
  const writeDatabase = new WriteDatabase();

  router.use((req, res, next) => { req.startTime = Date.now(); next(); });

  router.route('/').get(index.show);
  router.route('/writeDatabase').post(writeDatabase.process); 

  // Apply the routes to our application with the prefix /api
  app.use('/', router); 
  
}
