'use strict';
var mongo = require('mongoskin'),
    config = require('../config/config'),
    collection = require('../components/constants').mongodb.collections.Builds,
    Q = require('q'),
    db = mongo.db(config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.databaseName, {native_parser: true});

db.bind(collection);

module.exports.findBuildByNameAndOwner = function (name, owner) {
    return Q.Promise(function (resolve, reject) {
        db[collection].findOne({buildName: name, owner: owner}, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};

module.exports.findBuildsByProjectNameAndOwner = function (projectName, owner) {
    return Q.Promise(function (resolve, reject) {
        db[collection].find({projectName: projectName, owner: owner}).sort({timestamp: -1})
            .toArray(function (err, result) {
                if (!err) {
                    resolve(result);
                } else {
                    reject(err);
                }
            });
    });
};
