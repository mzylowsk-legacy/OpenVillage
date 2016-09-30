'use strict';
var Q = require('q'),
    fileUtils = require('../lib/utils/filesystem-tools'),
    utils = require('../lib/utils/others'),
    path = require('path'),
    config = require('../config/config'),
    constants = require('../components/constants');

var EXE_MODE = 0o700;
var SCRIPTS_CATALOG = 'scripts';

var initializeUserWorkspace = function (owner) {
    var userScriptsPath = path.join(config.builder.workspace.path, owner, SCRIPTS_CATALOG);
    return fileUtils.createDirectoryPath(userScriptsPath);
};

module.exports.saveScript = function (name, code, owner) {
    return Q.Promise(function (resolve, reject) {
        initializeUserWorkspace(owner)
            .then(function (workdir) {
                var scriptPath = path.join(workdir, name + '.sh');
                return fileUtils.writeFile(scriptPath, code, EXE_MODE);
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
    return fileUtils.isExistingPath(pathToCheck);
};

module.exports.isExistingDefaultScript = function (name) {
    var pathToCheck = path.join(constants.builder.commonScriptsPath, name + '.sh');
    return fileUtils.isExistingPath(pathToCheck);
};

module.exports.deleteScript = function (name, owner) {
    var pathToRemove = path.join(config.builder.workspace.path, owner, SCRIPTS_CATALOG, name + '.sh');
    return fileUtils.deleteFile(pathToRemove);
};

module.exports.getAllScripts = function (owner) {
    var userWorkdir = path.join(config.builder.workspace.path, owner, SCRIPTS_CATALOG);
    return Q.Promise(function (resolve, reject) {
        fileUtils.listDir(userWorkdir)
            .then(function(files) {
                var result = {scripts: []};
                for(var i in files) {
                    result.scripts.push({
                        name: utils.removeExtension(files[i])
                    });
                }
                resolve(result);
            })
            .catch(function(err) {
                   reject(err);
            });
    });
};


module.exports.getDefaultScripts = function () {
    var commonScriptsDir = constants.builder.commonScriptsPath;
    return Q.Promise(function (resolve, reject) {
        fileUtils.listDir(commonScriptsDir)
            .then(function(files) {
                var result = {scripts: []};
                for(var i in files) {
                    result.scripts.push({
                        name: utils.removeExtension(files[i])
                    });
                }
                resolve(result);
            })
            .catch(function(err) {
                reject(err);
            });
    });
};

module.exports.getScriptContent = function (name, owner) {
    var pathToRead = path.join(config.builder.workspace.path, owner, SCRIPTS_CATALOG, name + '.sh');
    return fileUtils.readFile(pathToRead);
};

module.exports.getDefaultScriptContent = function (name) {
    var pathToRead = path.join(constants.builder.commonScriptsPath, name + '.sh');
    return fileUtils.readFile(pathToRead);
};
