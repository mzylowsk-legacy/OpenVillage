'use strict';

var Q = require('q'),
    logger = require('../logger/logger').init(),
    sys = require('sys'),
    exec = require('child_process').exec,
    spawn = require('child_process').spawn;

module.exports.translateError = function (err) {
    if ('status' in err) {
        return JSON.stringify(err);
    } else if (Array.isArray(err) || typeof(err) === 'string') {
        return JSON.stringify({
            status: 500,
            message: err
        });
    } else {
        return JSON.stringify({
            status: 500,
            message: String(err),
            stringified: JSON.stringify(err)
        });
    }
};

module.exports.throwError = function (message) {
    logger.debug(message);
    throw message;
};

module.exports.runUnixCommand = function(command) {
    return Q.Promise(function (resolve, reject) {
        exec(command, function (error, stdout, stderr) {
            if(!error) {
                resolve({
                    stdout: stdout,
                    stderr: stderr,
                    error: error
                });
            } else {
                reject({
                    stdout: stdout,
                    stderr: stderr,
                    error: error
                });
            }
        });
    });
};

module.exports.spawnProcess = function(command, args) {
    if (args) {
        spawn(command, args.split(' '));
    } else {
        spawn(command);
    }
};
