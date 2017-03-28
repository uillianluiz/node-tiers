/**
 * Created by Uillian on 24/03/2017.
 */

var express = require('express');
var bodyParser = require('body-parser');
var cluster = require('cluster');
var fetch = require('node-fetch');
var sizeof = require('object-sizeof');
require('dotenv').config();
var functions = require('./functions');

var jsonParser = bodyParser.json();

//Define environment variables
const PORT = process.argv[2] ? process.argv[2] : process.env.PORT ? process.env.PORT : 3000;
const NEXT_TIER = process.env.NEXT_TIER != "" && process.env.NEXT_TIER != undefined ? process.env.NEXT_TIER : null;
const BANDWIDTH = process.env.BANDWIDTH ? process.env.BANDWIDTH : 400;
const NAME = process.argv[3] ? process.argv[3] : process.env.NAME ? process.env.NAME : "undefined";

//Generate BANDWIDTH object
var bandwidthElement = [];
for (var i = 0; i < BANDWIDTH; i++) {
    bandwidthElement.push({i: functions.randomString(i)});
}

if (cluster.isMaster) {
    console.log("BANDWIDTH parameter: " + BANDWIDTH);
    console.log("bandwidthElement has size: " + sizeof(bandwidthElement) + " bytes");
    console.log("The default next tier is: " + NEXT_TIER);

    //create #cpuCount workers that will process requests in a round robin way
    var cpuCount = require('os').cpus().length;
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
} else {
    var app = express();

    //cpu intensive route
    app.post('/cpu/', jsonParser, function (req, res) {
        var jsonParsed = functions.parseJson(req.body, req.query, bandwidthElement, NEXT_TIER);
        var nextTier = jsonParsed[0];
        var jsonToNextTier = jsonParsed[1];

        res.setHeader('Content-Type', 'application/json');
        if (nextTier != null) {
            fetch(nextTier, {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(jsonToNextTier)})
                .then(function (response) {
                    return response.json();
                }).then(function (json) {
                res.send(JSON.stringify({name: NAME, pi: functions.getPI(), NEXT_TIER: json}));
            }).catch(function (err) {
                console.log(err)
                res.status(500).send(JSON.stringify({err: true, name: NAME, pi: functions.getPI()}));
            });
        } else {
            res.send(JSON.stringify({name: NAME, pi: functions.getPI()}));
        }
    });

    //Last route for handling nothing found
    app.get('*', function (req, res) {
        res.status(404).send('Nothing Found');
    });

    app.post('*', function (req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.status(404).send(JSON.stringify({err: 404}));
    });

    app.listen(PORT, function () {
        console.log('Example app listening on PORT ' + PORT + "!")
    });
}