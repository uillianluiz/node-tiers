import * as express from 'express';

import Index from './routes/indexRoute';
import AckermanRoute from './routes/ackermanRoute';
import BinarySearchRoute from './routes/binarySearchRoute';
import LinearSearchRoute from './routes/linearSearchRoute';
import MallocRoute from './routes/mallocRoute';
import MatrixRoute from './routes/matrixRoute';
import MemoryRoute from './routes/memoryRoute';
import PiRoute from './routes/piRoute';
import WriteDatabaseRoute from './routes/writeDatabaseRoute';
import ZLibRoute from './routes/zlibRoute';

export default function setRoutes(app) {

  const router = express.Router();

  const index = new Index();
  const ackermanRoute = new AckermanRoute();
  const binarySearchRoute = new BinarySearchRoute();
  const linearSearchRoute = new LinearSearchRoute();
  const mallocRoute = new MallocRoute();
  const matrixRoute = new MatrixRoute();
  const memoryRoute = new MemoryRoute();
  const piRoute = new PiRoute();
  const writeDatabase = new WriteDatabaseRoute();
  const zlibRoute = new ZLibRoute();

  router.use((req, res, next) => { req.startTime = Date.now(); next(); });

  router.route('/').get(index.show);
  router.route('/ackerman').post(ackermanRoute.process); 
  router.route('/binarySearch').post(binarySearchRoute.process); 
  router.route('/linearSearch').post(linearSearchRoute.process); 
  router.route('/malloc').post(mallocRoute.process); 
  router.route('/matrix').post(matrixRoute.process); 
  router.route('/memory').post(memoryRoute.process); 
  router.route('/pi').post(piRoute.process); 
  router.route('/zlib').post(zlibRoute.process); 

  /**
   * only add the database route if the database is active
   */
  if(app.settings.databaseActive){
    router.route('/writeDatabase').post(writeDatabase.process); 
  }
  
  // Apply the routes to our application with the prefix /api
  app.use('/', router); 
  
}
