import * as express from 'express';
import AckermanRoute from './routes/ackermanRoute';
import BinarySearchRoute from './routes/binarySearchRoute';
import Index from './routes/indexRoute';
import IORoute from './routes/ioRoute';
import LinearSearchRoute from './routes/linearSearchRoute';
import MallocRoute from './routes/mallocRoute';
import MatrixRoute from './routes/matrixRoute';
import MemoryRoute from './routes/memoryRoute';
import NoneRoute from './routes/noneRoute';
import PiRoute from './routes/piRoute';
import WriteDatabaseRoute from './routes/writeDatabaseRoute';
import ZLibRoute from './routes/zlibRoute';
import WriteFileRoute from './routes/writeFileRoute';


export default function setRoutes(app) {

  const router = express.Router();

  const index = new Index();
  const ackermanRoute = new AckermanRoute();
  const binarySearchRoute = new BinarySearchRoute();
  const ioRoute = new IORoute();
  const linearSearchRoute = new LinearSearchRoute();
  const mallocRoute = new MallocRoute();
  const matrixRoute = new MatrixRoute();
  const memoryRoute = new MemoryRoute();
  const noneRoute = new NoneRoute();
  const piRoute = new PiRoute();
  const writeDatabase = new WriteDatabaseRoute();
  const zlibRoute = new ZLibRoute();
  const writeFileRoute = new WriteFileRoute();

  router.use((req, res, next) => { req.startTime = Date.now(); next(); });

  router.route('/').get(index.show);
  router.route('/ackerman').post(ackermanRoute.process);
  router.route('/binarySearch').post(binarySearchRoute.process);
  router.route('/io').post(ioRoute.process);
  router.route('/linearSearch').post(linearSearchRoute.process);
  router.route('/malloc').post(mallocRoute.process);
  router.route('/matrix').post(matrixRoute.process);
  router.route('/memory').post(memoryRoute.process);
  router.route('/none').post(noneRoute.process);
  router.route('/pi').post(piRoute.process);
  router.route('/writeFile').post(writeFileRoute.process);
  router.route('/zlib').post(zlibRoute.process);

  /**
   * only add the database route if the database is active
   */
  if (app.settings.databaseActive) {
    router.route('/writeDatabase').post(writeDatabase.process);
  }

  // Apply the routes to our application with the prefix /api
  app.use('/', router);

}
