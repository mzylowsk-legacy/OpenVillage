'use strict';
var Q = require('q'),
    utils = require('../lib/utils/filesystem-tools'),
    path = require('path'),
    config = require('../config/config'),
    constants = require('../components/constants');

var EXE_MODE = 0o700;
var SCRIPTS_CATALOG = 'scripts';

var initializeUserWorkspace = function (owner) {
    var userScriptsPath = path.join(config.builder.workspace.path, owner, SCRIPTS_CATALOG);
    return utils.createDirectoryPath(userScriptsPath);
};

module.exports.saveScript = function (name, code, owner) {
    return Q.Promise(function (resolve, reject) {
        initializeUserWorkspace(owner)
            .then(function (workdir) {
                var scriptPath = path.join(workdir, name + '.sh');
                return utils.writeFile(scriptPath, code, EXE_MODE);
            })
            .then(function (resultPath) {
                resolve(resultPath);
            })
            .catch(function (err) {
                reject(err);
            });
    });
};

module.exports.isExistingScript = function (name, owner) {
    var pathToCheck = path.join(config.builder.workspace.path, owner, SCRIPTS_CATALOG, name + '.sh');
    return utils.isExistingPath(pathToCheck);
};

module.exports.isExistingDefaultScript = function (name) {
    var pathToCheck = path.join(constants.builder.commonScriptsPath, name + '.sh');
    return utils.isExistingPath(pathToCheck);
};

module.exports.deleteScript = function (name, owner) {
    var pathToRemove = path.join(config.builder.workspace.path, owner, SCRIPTS_CATALOG, name + '.sh');
    return utils.deleteFile(pathToRemove);
};

module.exports.getAllScripts = function (owner) {
    var userWorkdir = path.join(config.builder.workspace.path, owner, SCRIPTS_CATALOG);
    return utils.listDir(userWorkdir);
};


module.exports.getDefaultScripts = function (owner) {
    var commonScriptsDir = constants.builder.commonScriptsPath;
    return utils.listDir(commonScriptsDir);
};

module.exports.getScriptContent = function (name, owner) {
    var pathToRead = path.join(config.builder.workspace.path, owner, SCRIPTS_CATALOG, name + '.sh');
    return utils.readFile(pathToRead);
};

module.exports.getDefaultScriptContent = function (name) {
    var pathToRead = path.join(constants.builder.commonScriptsPath, name + '.sh');
    return utils.readFile(pathToRead);
};
