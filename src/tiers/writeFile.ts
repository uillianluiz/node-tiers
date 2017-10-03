import { Tier, Status } from './tier';
import * as fs from 'fs';
import Util from './util';

/**
 * WriteFile tier
 * Main resources used: Disk
 */
export default class WriteFile extends Tier {

    rootDir = '/tmp/nodetiers';
    size: number;
    /**
     * 
     * @param size 
     */
    constructor(size = 100000) {
        super();
        this.size = size;
    }

    protected executeTask(): Status {
        try {
            let content = Util.randomString(this.size);
            let filePath = this.rootDir + new Date().getTime() + Util.randomString(10)
            fs.writeFileSync(filePath, content);
        } catch (err) {
            return new Status(`There was an error while writing the file.`, 500);
        }
        return new Status(`A file with size ${this.size} bytes was written`, 200);
    }
}