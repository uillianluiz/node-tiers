/**
 * Created by uillian on 29/03/17.
 */

var fs = require('fs');

var file = process.argv[2] ? process.argv[2] : null
const SEPARATOR = ";";

fs.readFile(file, 'utf8', function (err, data) {
    if (err) throw err;
    var jsonReport = JSON.parse(data);

    var requests = [];
    var latency = [];
    console.log(file)
    console.log("rps" + SEPARATOR + "min" + SEPARATOR + "max" + SEPARATOR + "median")

    for (var i = 0; i < jsonReport.intermediate.length; i++) {
        console.log(jsonReport.intermediate[i].rps.mean + SEPARATOR +
            jsonReport.intermediate[i].latency.min + SEPARATOR +
            jsonReport.intermediate[i].latency.max + SEPARATOR +
            jsonReport.intermediate[i].latency.median)
    }

});


