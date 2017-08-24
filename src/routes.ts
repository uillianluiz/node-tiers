import * as express from 'express';

import Index from './routes/index';

export default function setRoutes(app) {

  const router = express.Router();

  const index = new Index();


  router.route('/').get(index.show);

  // Apply the routes to our application with the prefix /api
  app.use('/', router);

}
