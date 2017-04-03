/**
 * Created by uillian on 29/03/17.
 */

var fs = require('fs');

var file = process.argv[2] ? process.argv[2] : null

fs.readFile(file, 'utf8', function (err, data) {
    if (err) throw err;
    var jsonReport = JSON.parse(data);

    var requests = [];
    var latency = [];

    for(var i=0; i< jsonReport.intermediate.length; i++){
        requests.push(jsonReport.intermediate[i].scenariosCreated);
        latency.push(jsonReport.intermediate[i].latency.median)
        console.log(jsonReport.intermediate[i].scenariosCreated + ";"+ jsonReport.intermediate[i].latency.median)
    }

});


