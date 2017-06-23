/**
 * Created by Uillian on 24/03/2017.
 */

var express = require('express');
var bodyParser = require('body-parser');
var cluster = require('cluster');
var sizeof = require('object-sizeof');
require('dotenv').config();
var functions = require('./functions');
var os = require("os");
var jsonParser = bodyParser.json();

//Set port number
const PORT = process.argv[2] || process.env.PORT || 3000;
//Generate BANDWIDTH dummy object
var dummyNetwork = {"text": functions.randomString((process.env.BANDWIDTH || 256) * 1000)};
//Generate FILE dummy text
var dummyFile = functions.randomString((process.env.FILE_SIZE || 128) * 1000);

if (cluster.isMaster) {
    console.log("Dummy network set to " + sizeof(dummyNetwork) / 2 + " bytes");
    console.log("Dummy file size set to " + sizeof(dummyFile) / 2 + " bytes");

    //create #cpuCount workers that will process requests in a round robin way
    var cpuCount = os.cpus().length;
    cpuCount = cpuCount > process.env.MAX_CPU ? process.env.MAX_CPU : cpuCount;
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
} else {
    var app = express();
    app.use(bodyParser.json({limit: '16mb'}));

    //send global data to routes
    app.use(function (req, res, next) {
        req.dummyNetwork = dummyNetwork;
        req.dummyFile = dummyFile;
        req.NAME = os.hostname();
        next();
    });

    var cpu = require('./routes/cpu');
    var light = require('./routes/light');
    var write = require('./routes/write');
    var writeSync = require('./routes/writeSync');
    app.use('/cpu/', cpu);
    app.use('/light/', light);
    app.use('/write/', write);
    app.use('/writeSync/', writeSync);

    //change the bandwidth of each transaction
    app.post('/bandwidth/:size', function (req, res) {
        var newSize = req.params.size;
        dummyNetwork = {"text": functions.randomString(newSize * 1000)};
        console.log("Dummy network set to " + sizeof(dummyNetwork) / 2 + " bytes");
        res.send("Dummy network set to " + newSize + "kb (" + sizeof(dummyNetwork) / 2 + " bytes)");
    });

    //change the dummy file size of each write transaction
    app.post('/filesize/:size', function (req, res) {
        var newSize = req.params.size;dummyFile = functions.randomString(newSize * 1000);
        console.log("Dummy file size set to " + sizeof(dummyFile) / 2 + " bytes");
        res.send("Dummy file size set to " + newSize + "kb (" + sizeof(dummyFile) / 2 + " bytes)");
    });

    //get status of the bandwidth and the dummy file size
    app.get('/status/', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            "dummyNetwork": parseInt(sizeof(dummyNetwork) / 1000),
            "dummyFile": parseInt(sizeof(dummyFile) / 1000) / 2
        }));
    });

    //Last routes for handling nothing found
    app.get('*', function (req, res) {
        res.status(404).send('Nothing Found');
    });
    app.post('*', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).send(JSON.stringify({err: 404}));
    });

    app.listen(PORT, function () {
        console.log('Process with PID ' + process.pid + ' listening on PORT ' + PORT + "!")
    });
}
