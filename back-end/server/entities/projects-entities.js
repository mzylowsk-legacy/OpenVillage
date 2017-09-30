'use strict';
var mongo = require('mongoskin'),
    config = require('../config/config'),
    collection = require('../components/constants').mongodb.collections.Projects,
    Q = require('q'),
    securityTools = require('../lib/utils/security-tools'),
    db = mongo.db(config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.databaseName, {native_parser: true});

db.bind(collection);

module.exports.addProject = function (project) {
    return Q.Promise(function (resolve, reject) {
        if (project.isPrivate) {
            project.password = securityTools.encrypt(project.password);
        }

        db[collection].insert(project, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};

module.exports.findProjectByNameAndOwner = function (name, owner, shouldReturnPassword) {
    return Q.Promise(function (resolve, reject) {
        db[collection].findOne({name: name, owner: owner}, shouldReturnPassword ? {} : {password: 0}, function (err, result) {
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
        db[collection].remove({name: name, owner: owner}, function (err, result) {
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
        db[collection].find({owner: owner}).toArray(function (err, result) {
            if (!err) {
                result.forEach(function (project) {
                   delete project.password;
                });
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};

module.exports.findAllProjects = function () {
    return Q.Promise(function (resolve, reject) {
        db[collection].find().toArray(function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};

module.exports.editProject = function (projectName, project, owner) {
    return Q.Promise(function (resolve, reject) {
        db[collection].update({name: projectName, owner: owner}, {$set: project}, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};

module.exports.setAsAutoScript = function (projectName, owner, scriptName) {
    return Q.Promise(function (resolve, reject) {
         db[collection].update({name: projectName, owner: owner}, {$set: {autoScript: scriptName}}, {strict: true},
         function (err, result) {
             if(!err) {
                 resolve({scriptName: scriptName});
             } else {
                 reject(err);
             }
         });
     });
}
