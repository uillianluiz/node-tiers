/**
 * Created by uillian on 18/04/17.
 */

var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
var functions = require('../functions');

//disk write file route
router.post('/', function (req, res) {
    //parse request, obtaining the nextTier URL and the json to be sent to it
    var jsonParsed = functions.parseJson(req.body, req.query, req.dummyNetwork);
    var nextTier = jsonParsed[0];
    var jsonToNextTier = jsonParsed[1];
    res.setHeader('Content-Type', 'application/json');

    var filePath = "/tmp/" + new Date().getTime() + functions.randomString(10);
    if (nextTier != null) {
        var requestCode = 200;
        fetch(nextTier, {
            method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(jsonToNextTier)
        }).then(function (response) {
            requestCode = response.status;
            return response.json()
        }).then(function (json) {
            functions.writeFileSync(filePath, req.dummyFile, function (status) {
                if (status) {
                    functions.removeFile(filePath);
                    res.status(requestCode).send(JSON.stringify({name: req.NAME, msg: "ok-writing", NEXT_TIER: json}));
                } else {
                    res.status(500).send(JSON.stringify({name: req.NAME, msg: "err-writing", NEXT_TIER: json}));
                }
            });
        }).catch(function (err) {
            functions.writeFileSync(filePath, req.dummyFile, function (status) {
                if (status) {
                    functions.removeFile(filePath);
                    res.status(501).send(JSON.stringify({name: req.NAME, msg: "ok-writing"}));
                } else {
                    res.status(500).send(JSON.stringify({name: req.NAME, msg: "err-writing"}));
                }
            });
        });
    } else {
        functions.writeFileSync(filePath, req.dummyFile, function (status) {
            if (status) {
                functions.removeFile(filePath);
                res.send(JSON.stringify({name: req.NAME, msg: "ok-writing"}));
            } else {
                res.status(500).send(JSON.stringify({name: req.NAME, msg: "err-writing"}));
            }
        });
    }
});

module.exports = router;
