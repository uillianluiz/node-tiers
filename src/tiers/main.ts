

import Util from "./util";
import Ackerman from './ackerman'
import Pi from './pi'
import LinearSearch from "./linearSearch";
import BinarySearch from "./binarySearch";
import ZLib from "./zlib";
import Matrix from "./matrix";
import Malloc from "./malloc";
import WriteDatabase from "./writeDatabase";

let pi = new Pi();
console.log(pi.execute(1000000));

var ackerman = new Ackerman();
console.log(ackerman.execute());

var linearSearch = new LinearSearch();
console.log(linearSearch.execute());
console.log(linearSearch.execute());
console.log(linearSearch.execute(Util.arraysLength));


var binarySearch = new BinarySearch();
console.log(binarySearch.execute());
console.log(binarySearch.execute());
console.log(binarySearch.execute(Util.arraysLength));

var zlib = new ZLib();
console.log(zlib.execute());
console.log(zlib.execute());
console.log(zlib.execute(100000));

var matrix = new Matrix();
console.log(matrix.execute());
console.log(matrix.execute());
console.log(matrix.execute());


var malloc = new Malloc();
console.log(malloc.execute());
console.log(malloc.execute());
console.log(malloc.execute());

var writeDatabase = new WriteDatabase();
console.log(writeDatabase.execute());