'use strict';
var mongo = require('mongoskin'),
    Q = require('q'),
    db = mongo.db("mongodb://localhost:27017/openvillage", {native_parser: true});

db.bind('projects');

module.exports.addProject = function (project) {
    return Q.Promise(function (resolve, reject) {
        db.projects.insert(project, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};

module.exports.findProjectByNameAndOwner = function (name, owner) {
    return Q.Promise(function (resolve, reject) {
        db.projects.findOne({name: name, owner: owner}, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};

module.exports.deleteProjectByNameAndOwner = function (name, owner) {
    return Q.Promise(function (resolve, reject) {
        db.projects.remove({name: name, owner: owner}, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};

module.exports.findProjectsByOwner = function (owner) {
    return Q.Promise(function (resolve, reject) {
        db.projects.find({owner: owner}).toArray(function(err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};
