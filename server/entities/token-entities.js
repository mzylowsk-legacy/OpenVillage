'use strict';
var mongo = require('mongoskin'),
    Q = require('q'),
    db = mongo.db("mongodb://localhost:27017/openvillage", {native_parser:true});

db.bind('tokens');

module.exports.addToken = function(username, token, type) {
    return Q.Promise(function (resolve, reject) {
        db.tokens.insert({username: username, token: token, type: type}, function(err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};

module.exports.findTokenByUsernameAndType = function(username, type) {
    return Q.Promise(function (resolve, reject) {
        db.tokens.findOne({username: username, type: type}, function(err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};

module.exports.deleteByUsernameAndType = function(username, type) {
    return Q.Promise(function (resolve, reject) {
        db.tokens.remove({username: username, type: type}, function(err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};