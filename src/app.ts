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
app.use(bodyParser.json({limit: '8mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));
app.disable('etag');
app.use(responseTime());

mongoose.connect(process.env.MONGODB_URI);
const db = mongoose.connection;
(<any>mongoose).Promise = global.Promise;


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  setRoutes(app);

  app.listen(app.get('port'), () => {
    console.log('Node-tier benchmark listening on port: ' + app.get('port'));
  });

});

export { app };
