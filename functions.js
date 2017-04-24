/**
 * Created by uillian on 28/03/17.
 */
var fs = require('fs');

module.exports = {
    getPI: function () {
        var p16 = 1, pi = 0, precision = 100000;
        for (var k = 0; k <= precision; k++) {
            pi += 1.0 / p16 * (4.0 / (8 * k + 1) - 2.0 / (8 * k + 4) - 1.0 / (8 * k + 5) - 1.0 / (8 * k + 6));
            p16 *= 16;
        }
        return pi;
    },
    randomString: function (length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    },
    parseJson: function (body, query, bandwidthElement) {
        if (body.hasOwnProperty("nextTier") && body.nextTier.length > 0) {
            nextTier = body.nextTier[0];
            body.nextTier.splice(0, 1); //remove the the first next tier from the list
            jsonToNextTier = Object.assign({},
                {"nextTier": body.nextTier},
                {"dummy": bandwidthElement}
            );
        } else {
            nextTier = query.nextTier ? query.nextTier : null;
            jsonToNextTier = {"dummy": bandwidthElement};
        }
        return [nextTier, jsonToNextTier];
    },
    writeFile: function (filePath, fileContent, fnStatus) {
        fs.writeFile(filePath, fileContent, function (err) {
            if (err) fnStatus(false);
            else fnStatus(true);
        });
    },
    removeFile: function (filePath) {
        setTimeout(function () {
            fs.stat(filePath, function (err) {
                if(!err){
                    fs.unlink(filePath, function (err) {
                        if (err) console.error(err);
                    });
                }
            });
        }, 60000);
    }
}