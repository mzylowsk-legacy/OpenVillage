'use strict';
var mongo = require('mongoskin'),
    config = require('../config/config'),
    collection = require('../components/constants').mongodb.collections.Agenda,
    Q = require('q'),
    db = mongo.db(config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.databaseName, {native_parser: true});

db.bind(collection);

module.exports.getAgendaCrons = function (projectName, owner) {
    return Q.Promise(function (resolve, reject) {
        db[collection].find({"data.projectName": projectName, "data.owner": owner}).toArray(function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};

module.exports.deleteAgendaCrons = function (cronName, owner) {
    return Q.Promise(function (resolve, reject) {
        db[collection].remove({name: cronName, "data.owner": owner}, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};