'use strict';

var Q = require('q'),
    mkdirp = require('mkdirp'),
    fs = require('fs');


module.exports.createDirectoryPath = function(path) {
    return Q.Promise(function (resolve, reject) {
        mkdirp(path, function (err) {
            if (!err) {
                resolve(path);
            } else {
                reject(err);
            }
        });
    });
};

module.exports.writeFile = function(path, content, mode) {
    return Q.Promise(function (resolve, reject) {
        fs.writeFile(path, content, { mode: mode }, function(err) {
            if (!err) {
                resolve(path);
            } else {
                reject(err);
            }
        });
    });
};

module.exports.isExistingPath = function(path) {
    return Q.Promise(function (resolve, reject) {
        fs.exists(path, function(exists) {
            if(exists) {
                resolve(exists);
            } else {
                reject({
                    fileExists: exists
                });
            }
        });
    });
};

module.exports.deleteFile = function(path) {
    return Q.Promise(function (resolve, reject) {
        fs.unlink(path, function(err) {
            if(!err) {
                resolve();
            } else {
                reject(err);
            }
        });
    });
};

module.exports.listDir = function(path) {
    return Q.Promise(function (resolve, reject) {
        fs.readdir(path, function(err, files) {
            if(!err) {
                resolve(files);
            } else {
                reject(err);
            }
        });
    });
};

module.exports.readFile = function(path) {
    return Q.Promise(function (resolve, reject) {
        fs.readFile(path, function(err, content) {
            if(!err) {
                resolve(content);
            } else {
                reject(err);
            }
        });
    });
};
