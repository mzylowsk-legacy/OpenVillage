'use strict';
var mongo = require('mongoskin'),
    config = require('../config/config'),
    Q = require('q'),
    collection = require('../components/constants').mongodb.collections.Users,
    db = mongo.db(config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.databaseName, {native_parser: true});

db.bind(collection);

module.exports.addUser = function (newUser) {
    return Q.Promise(function (resolve, reject) {
        db[collection].insert(newUser, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    });
};

module.exports.findUserByEmail = function (email) {
    return Q.Promise(function (resolve, reject) {
        db[collection].findOne({email: email}, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        })
    });
};

module.exports.findUserByUsername = function (username) {
    return Q.Promise(function (resolve, reject) {
        db[collection].findOne({username: username}, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};

module.exports.deleteUserByEmail = function (email) {
    return Q.Promise(function (resolve, reject) {
        db[collection].remove({email: email}, function (err, result) {
            if(!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};

module.exports.activateByUsername = function (username) {
    return Q.Promise(function (resolve, reject) {
        db[collection].update({username: username}, {$set: {activated: true}}, {strict: true}, function (err, result) {
            if(!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};

module.exports.updateByUsername = function (username, userAttributes) {
    return Q.Promise(function (resolve, reject) {
        db[collection].update({username: username}, {$set: userAttributes}, {strict: true}, function (err, result) {
            if(!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};

module.exports.setNewPasswordForUsername = function (username, newPassword) {
    return Q.Promise(function (resolve, reject) {
        db[collection].update({username: username}, {$set: {password: newPassword}}, {strict: true}, function (err, result) {
            if(!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};

module.exports.setNewPasswordForEmail = function (email, newPassword) {
    return Q.Promise(function (resolve, reject) {
        db[collection].update({email: email}, {$set: {password: newPassword}}, {strict: true}, function (err, result) {
            if(!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};

module.exports.getUserProfile = function (username) {
    return Q.Promise(function (resolve, reject) {
        db[collection].findOne({username: username}, function(err, result) {
            if(!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};