var gulp = require('gulp');
var exec = require('child_process').exec;
var os = require('os');

var currentOS = os.platform();

var buildMalloc = "gcc -shared -fpic src/tiers/malloc.c -o dist/clib/libmalloc.so";

gulp.task('build',function(){
    exec(buildMalloc, function (error, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});