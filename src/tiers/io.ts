import { Tier, Status } from './tier';
import ffi = require('ffi');
import Util from "./util";

/**
 * Disk IO tier (Linux only)
 * Main resources used: Disk IO (Writing)
 */
export default class IO extends Tier {

  length: number;
  filePath: string;

  constructor(length = 4000) {
    super();
    this.length = length;
    this.filePath = "/tmp/ntiers" + new Date().getTime() + Util.randomString(5);
  }


  protected executeTask(): Status {
    var libio = ffi.Library('./dist/clib/libio', {
      'stressIO': ['int', ['string', 'long']]
    });

    var output = libio.stressIO(this.filePath, this.length);
    if (output == -1)
      return new Status("There was an error executing the IO stress lib.", 500);
    return new Status("IO stress lib executed successfully.");
  }
}