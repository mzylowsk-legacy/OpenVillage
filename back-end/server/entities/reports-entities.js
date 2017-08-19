'use strict';
var mongo = require('mongoskin'),
    config = require('../config/config'),
    Q = require('q'),
    collection = require('../components/constants').mongodb.collections.Reports,
    db = mongo.db(config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.databaseName, {native_parser: true});

db.bind(collection);

module.exports.addReport = function (newReport) {
    return Q.Promise(function (resolve, reject) {
        db[collection].insert(newReport, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    });
};