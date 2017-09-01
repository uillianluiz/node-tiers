var gulp = require('gulp');
var exec = require('child_process').exec;
var os = require('os');

var currentOS = os.platform();

var buildMalloc = "mkdir dist/clib || gcc -shared -fpic src/tiers/malloc.c -o dist/clib/libmalloc.so";
var buildMemory = "mkdir dist/clib || gcc -shared -fpic src/tiers/memory.c -o dist/clib/libmemory.so";
var buildIO     = "mkdir dist/clib || gcc -shared -fpic src/tiers/io.c -o dist/clib/libio.so";

gulp.task('build',function(){
    exec(buildMalloc, function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
    exec(buildMemory, function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
    exec(buildIO, function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});