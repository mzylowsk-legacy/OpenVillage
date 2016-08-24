'use strict';
var mongo = require('mongoskin'),
    Q = require('q'),
    db = mongo.db("mongodb://localhost:27017/openvillage", {native_parser: true});

db.bind('users');

module.exports.addUser = function (newUser) {
    return Q.Promise(function (resolve, reject) {
        db.users.insert(newUser, function (err, result) {
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
        db.users.findOne({email: email}, function (err, result) {
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
        db.users.findOne({username: username}, function (err, result) {
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
        db.users.remove({email: email}, function (err, result) {
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
        db.users.update({username: username}, {$set: {activated: true}}, {strict: true}, function (err, result) {
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
        db.users.update({username: username}, {$set: userAttributes}, {strict: true}, function (err, result) {
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
        db.users.update({username: username}, {$set: {password: newPassword}}, {strict: true}, function (err, result) {
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
        db.users.update({email: email}, {$set: {password: newPassword}}, {strict: true}, function (err, result) {
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
        db.users.findOne({username: username}, function(err, result) {
            if(!err) {
                resolve(result);
            } else {
                reject(err);
            }
        });
    });
};