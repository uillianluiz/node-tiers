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
var mysql = require('mysql');

var jsonParser = bodyParser.json();

//Define environment variables
const PORT = process.argv[2] ? process.argv[2] : process.env.PORT ? process.env.PORT : 3000;
const NEXT_TIER = process.env.NEXT_TIER != "" && process.env.NEXT_TIER != undefined ? process.env.NEXT_TIER : null;
const BANDWIDTH = process.env.BANDWIDTH ? process.env.BANDWIDTH : 400;
const NAME = process.argv[3] ? process.argv[3] : process.env.NAME ? process.env.NAME : "undefined";

//Generate BANDWIDTH dummy object
var bandwidthElement = {"text": functions.randomString(BANDWIDTH * 500)};
//Generate DATABASE dummy text
var dbText = functions.randomString(process.env.DB_ENTRY_SIZE/2);


if (cluster.isMaster) {
    console.log("BANDWIDTH parameter: " + BANDWIDTH);
    console.log("bandwidthElement has size: " + sizeof(bandwidthElement) + " bytes");
    console.log("dbText has size: " + sizeof(dbText) + " bytes");
    console.log("The default next tier is: " + NEXT_TIER);

    //create #cpuCount workers that will process requests in a round robin way
    var cpuCount = require('os').cpus().length;
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
} else {
    var app = express();
    app.use(bodyParser.json({limit: '10mb'}));
    var connection = mysql.createConnection({
        host: 'localhost',
        user: process.env.DB_USER,
        password: process.env.DB_PASSWD,
        database: 'node_tiers'
    });
    connection.connect(function (err) {
        if (err) {
            console.error("Database not connected. Exiting...");
            process.exit(1);
        }
    });


    //cpu intensive route
    app.post('/cpu/', jsonParser, function (req, res) {
        var jsonParsed = functions.parseJson(req.body, req.query, bandwidthElement, NEXT_TIER);
        var nextTier = jsonParsed[0];
        var jsonToNextTier = jsonParsed[1];

        res.setHeader('Content-Type', 'application/json');
        if (nextTier != null) {
            fetch(nextTier, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(jsonToNextTier)
            })
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

    //non-intensive (light) route
    app.post('/light/', jsonParser, function (req, res) {
        var jsonParsed = functions.parseJson(req.body, req.query, bandwidthElement, NEXT_TIER);
        var nextTier = jsonParsed[0];
        var jsonToNextTier = jsonParsed[1];

        res.setHeader('Content-Type', 'application/json');
        if (nextTier != null) {
            fetch(nextTier, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(jsonToNextTier)
            })
                .then(function (response) {
                    return response.json();
                }).then(function (json) {
                res.send(JSON.stringify({name: NAME, msg: "Non-Intensive", NEXT_TIER: json}));
            }).catch(function (err) {
                console.log(err)
                res.status(500).send(JSON.stringify({err: true, name: NAME, msg: "Non-Intensive"}));
            });
        } else {
            res.send(JSON.stringify({name: NAME, msg: "Non-Intensive"}));
        }
    });

    //disk write route
    app.post('/write/', jsonParser, function (req, res) {
        var jsonParsed = functions.parseJson(req.body, req.query, bandwidthElement, NEXT_TIER);
        var nextTier = jsonParsed[0];
        var jsonToNextTier = jsonParsed[1];
        res.setHeader('Content-Type', 'application/json');


        var post = {"value": dbText};
        if (nextTier != null) {
            fetch(nextTier, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(jsonToNextTier)
            })
                .then(function (response) {
                    return response.json();
                }).then(function (json) {
                var query = connection.query('INSERT INTO `dummy_write` SET ?', post, function (err, result) {
                    if (err) {
                        res.send(JSON.stringify({name: NAME, msg: "err-writing", NEXT_TIER: json}));
                    } else {
                        res.send(JSON.stringify({name: NAME, msg: "ok-writing", NEXT_TIER: json}));
                    }
                });

            }).catch(function (err) {
                console.log(err);
                var query = connection.query('INSERT INTO `dummy_write` SET ?', post, function (err, result) {
                    if (err) {
                        res.status(500).send(JSON.stringify({err: true, name: NAME, msg: "err-writing"}));
                    } else {
                        res.status(500).send(JSON.stringify({err: true, name: NAME, msg: "ok-writing"}));
                    }
                });
            });
        } else {
            var query = connection.query('INSERT INTO `dummy_write` SET ?', post, function (err, result) {
                if (err) {
                    res.send(JSON.stringify({name: NAME, msg: "err-writing"}));
                } else {
                    res.send(JSON.stringify({name: NAME, msg: "ok-writing"}));
                }
            });
        }
    });

    //disk read route
    app.post('/read/', jsonParser, function (req, res) {
        var jsonParsed = functions.parseJson(req.body, req.query, bandwidthElement, NEXT_TIER);
        var nextTier = jsonParsed[0];
        var jsonToNextTier = jsonParsed[1];
        res.setHeader('Content-Type', 'application/json');

        if (nextTier != null) {
            fetch(nextTier, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(jsonToNextTier)
            })
                .then(function (response) {
                    return response.json();
                }).then(function (json) {
                var query = connection.query('SELECT SQL_NO_CACHE sum(char_length(value)) as value FROM dummy_read;', function (err, result) {
                    if (err) {
                        res.send(JSON.stringify({name: NAME, msg: "err-reading", NEXT_TIER: json}));
                    } else {
                        res.send(JSON.stringify({name: NAME, msg: result[0].value, NEXT_TIER: json}));
                    }
                });
            }).catch(function (err) {
                console.log(err);
                var query = connection.query('SELECT SQL_NO_CACHE sum(char_length(value)) as value FROM dummy_read;', function (err, result) {
                    if (err) {
                        res.status(500).send(JSON.stringify({err: true, name: NAME, msg: "err-reading"}));
                    } else {
                        res.status(500).send(JSON.stringify({err: true, name: NAME, msg: result[0].value}));
                    }
                });
            });
        } else {
            var query = connection.query('SELECT SQL_NO_CACHE sum(char_length(value)) as value FROM dummy_read;', function (err, result) {
                if (err) {
                    res.send(JSON.stringify({name: NAME, msg: "err-reading"}));
                } else {
                    res.send(JSON.stringify({name: NAME, msg: result[0].value}));
                }
            });
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