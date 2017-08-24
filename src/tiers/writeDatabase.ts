import * as mongoose from 'mongoose';
import { Tier, Status } from './tier';
import Util from './util';

/**
 * Mongoose schema that is used to insert data into the database
 */
const writeSchema = new mongoose.Schema({
    content: String,
    timestamp: { type: Date, default: Date.now }
});
const Write = mongoose.model('Write', writeSchema);

/**
 * WriteDatabase tier
 * Main resources used: Disk (write)
 */
export default class WriteDatabase extends Tier {

    dbElementSize: number;
    constructor(dbElementSize = 64000){
        super();
        this.dbElementSize = dbElementSize;
    }

    /**
     * 
     * @param params Function callback that will retrive the status object OR Array with [callback, dbElementSize]
     * The element size is the size in bytes that will be written and deleted by the database. It may be changed in the default Util or in the executeTask call.
     */
    protected executeTask(fn: (Status) => void ): void {
        let content = Util.randomString(this.dbElementSize);
       
        //create, then remove the object from the database
        Write.create({content: content}, (err, write) => {
            if(err) return fn(new Status("Error while writting the object."));

            Write.remove({_id : write._id}, (err) => {
                if(err) return fn(new Status("Error while deleting the object."));
                fn(new Status("Object written successfully."));
            });
        });
    }

}