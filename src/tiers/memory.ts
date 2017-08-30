import { Tier, Status } from './tier';
import ffi = require('ffi');

/**
 * Memory tier (Linux only)
 * Main resources used: Memory
 */
export default class Memory extends Tier {

  length: number;

  constructor(length = 340000) {
    super();
    this.length = length;
  }


  protected executeTask(): Status {
    var libmemory = ffi.Library('./dist/clib/libmemory', {
      'stressMemory': ['int', ['long']]
    });

    var output = libmemory.stressMemory(this.length);
    if (output == -1)
      return new Status("There was an error executing the memory stress lib.", 500);
    return new Status("Memory stress lib executed successfully.");
  }
}