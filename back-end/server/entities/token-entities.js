'use strict';
var mongo = require('mongoskin'),
    config = require('../config/config'),
    Q = require('q'),
    collection = require('../components/constants').mongodb.collections.Tokens,
    db = mongo.db(config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.databaseName, {native_parser: true});

db.bind(collection);

module.exports.addToken = function(username, token, type) {
    return Q.Promise(function (resolve, reject) {
        db[collection].insert({username: username, token: token, type: type}, function(err, result) {
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
        db[collection].findOne({username: username, type: type}, function(err, result) {
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
        db[collection].remove({username: username, type: type}, function(err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};