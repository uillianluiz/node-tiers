import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
import responseTime = require('response-time');

import setRoutes from './routes';

const app = express();
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json({ limit: '8mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));
app.disable('etag');
app.use(responseTime());

/**
 * Start app, setting up the routes and listening to the defined port.
 */
let startAPP = () => {
  setRoutes(app);

  app.listen(app.get('port'), () => {
    console.log('Node-tier benchmark listening on port: ' + app.get('port'));
  });
}

/**
 * check if the DB is supposed to start or not.
 * routes which will not execute database operations don't need to have mongodb.
 * start the server using: npm start -- --DBdisabled
 */
if (process.argv.length >= 3 && process.argv[2].toLocaleLowerCase() === '--dbdisabled') {
  console.log("Database disabled!");
  app.set('databaseActive', false);
  startAPP();
} else {
  mongoose.connect(process.env.MONGODB_URI);
  const db = mongoose.connection;
  (<any>mongoose).Promise = global.Promise;

  db.on('error', () => {
    console.error.bind(console, 'connection error:');
    console.log('Perhaps, you should execute: npm start -- --DBdisabled');
  });
  db.once('open', () => {
    console.log('Connected to MongoDB');
    app.set('databaseActive', true);
    startAPP();
  });
}

export { app };
