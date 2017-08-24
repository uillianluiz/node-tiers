import * as mongoose from 'mongoose';
import { Tier, Status } from './tier';
import Util from './util';

const writeSchema = new mongoose.Schema({
    content: String,
    timestamp: { type: Date, default: Date.now }
});
  
const Write = mongoose.model('Write', writeSchema);

export default class WriteDatabase extends Tier {

    protected executeTask(params: (Status) => void | [(Status) => void, number]): void {
        let content, fn;
        if(typeof params == "function"){
            fn = params;
            content = Util.randomString(500);
        }else{
            fn = params[0];
            content = Util.randomString(params[1]);
        }
        Write.create({content: content}, (err) => {
            if(err) fn(new Status("Error while writting the object."));
            else fn(new Status("Object written successfully."));
        });
    }

}