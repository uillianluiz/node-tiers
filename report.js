/**
 * Created by uillian on 29/03/17.
 */

var fs = require('fs');

var file = process.argv[2] ? process.argv[2] : null

fs.readFile(file, 'utf8', function (err, data) {
    if (err) throw err;
    var jsonReport = JSON.parse(data);

    for(var i=0; i< jsonReport.intermediate.length; i++){
        console.log(jsonReport.intermediate[i].scenariosCreated + ";"+ jsonReport.intermediate[i].latency.median)
    }
});