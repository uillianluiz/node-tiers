/**
 * Created by uillian on 18/04/17.
 */

var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var functions = require('../functions');

//non-intensive (light) route
router.post('/', function (req, res) {
    //parse request, obtaining the nextTier URL and the json to be sent to it
    var jsonParsed = functions.parseJson(req.body, req.query, req.dummyNetwork);
    var nextTier = jsonParsed[0];
    var jsonToNextTier = jsonParsed[1];

    res.setHeader('Content-Type', 'application/json');
    if (nextTier != null) {
        fetch(nextTier, {
            method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(jsonToNextTier)
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            res.send(JSON.stringify({name: req.NAME, msg: "Non-Intensive", NEXT_TIER: json}));
        }).catch(function (err) {
            console.log(err);
            res.status(500).send(JSON.stringify({err: true, name: req.NAME, msg: "Non-Intensive"}));
        });
    } else {
        res.send(JSON.stringify({name: req.NAME, msg: "Non-Intensive"}));
    }
});

module.exports = router;