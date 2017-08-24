import * as mongoose from 'mongoose';
import { Tier, Status } from './tier';
import Util from './util';

const writeSchema = new mongoose.Schema({
    content: String,
    timestamp: { type: Date, default: Date.now }
});
  
const Write = mongoose.model('Write', writeSchema);

export default class WriteDatabase extends Tier {

    protected executeTask(params?: any): Status {
        let write = new Write(Util.randomString(500));
        write.save((err) => {
            if(err) return new Status("Error while writting the object.");
            return new Status("Object written successfully.")
        });
    }

}