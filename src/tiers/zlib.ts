import { Tier, Status } from './tier';
import Util from './util';
import zlib = require('zlib');

/**
 * ZLib tier
 * Main resources used: CPU, cache and memory
 */
export default class ZLib extends Tier {

    /**
     * Compress and decompress a random text using the nodejs native library zlib
     * @param textLength length of the random text that will be compressed and decompressed
     */
    protected executeTask(textLength = 40000): any {
        let input = Util.randomString(textLength);
        let compressed = zlib.deflateSync(input);
        let original = zlib.inflateSync(compressed);
        if(input != original.toString('ascii')) 
            return new Status("There was an error while compressing/decompressing.", 500);
        return new Status("Text sucessfully compressed and decompressed.");
    }

}