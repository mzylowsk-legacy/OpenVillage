'use strict';

var scriptsFileEntities = require('../entities/scripts-file-entities'),
    httpStatuses = require('../components/http-statuses'),
    logger = require('../lib/logger/logger').init(),
    utils = require('../lib/utils/others'),
    Q = require('q');


var addNewScript = function (scriptEntity, owner, project) {
    return Q.Promise(function (resolve, reject) {
        scriptsFileEntities.saveScript(scriptEntity.name, scriptEntity.code, owner, project)
            .then(function () {
                logger.debug('Script %s has been saved in %s catalog.', scriptEntity.name, owner + '/' + project);
                resolve(httpStatuses.Scripts.Created);
            })
            .catch(function (err) {
                logger.error('Error: ' + utils.translateError(err));
                reject(err);
            });
    });
};

var deleteScript = function (projectName, name, owner) {
    return Q.Promise(function (resolve, reject) {
        scriptsFileEntities.isExistingScript(projectName, name, owner)
            .then(function () {
                logger.debug('Script %s has been found.', name);
                return scriptsFileEntities.deleteScript(projectName, name, owner);
            })
            .then(function () {
                logger.debug('Script %s has been deleted.', name);
                resolve(httpStatuses.Scripts.Removed);
            })
            .catch(function (err) {
                logger.error('Error: ' + utils.translateError(err));
                reject(err);
            });
    });
};

var getAllScripts = function (owner, project) {
    return Q.Promise(function (resolve, reject) {
        scriptsFileEntities.getAllScripts(owner, project)
            .then(function (scripts) {
                logger.debug('Scripts for %s listed.', owner);
                resolve(scripts);
            })
            .catch(function (err) {
                logger.error('Error: ' + utils.translateError(err));
                reject(err);
            });
    });
};


var getDefaultScripts = function () {
    return Q.Promise(function (resolve, reject) {
        scriptsFileEntities.getDefaultScripts()
            .then(function (scripts) {
                logger.debug('Default scripts listed.');
                resolve(scripts);
            })
            .catch(function (err) {
                logger.error('Error: ' + utils.translateError(err));
                reject(err);
            });
    });
};

var getScriptContent = function (projectName, name, owner) {
    return Q.Promise(function (resolve, reject) {
        scriptsFileEntities.isExistingScript(projectName, name, owner)
            .then(function () {
                logger.debug('Script %s has been found', name);
                return scriptsFileEntities.getScriptContent(projectName, name, owner);
            })
            .then(function (content) {
                logger.debug('Script for %s has been sent.', owner);
                resolve(content);
            })
            .catch(function (err) {
                logger.error('Error: ' + utils.translateError(err));
                reject(err);
            });
    });
};

var getDefaultScriptContent = function (name) {
    return Q.Promise(function (resolve, reject) {
        scriptsFileEntities.isExistingDefaultScript(name)
            .then(function () {
                logger.debug('Script %s has been found', name);
                return scriptsFileEntities.getDefaultScriptContent(name);
            })
            .then(function (content) {
                logger.debug('Default script for has been sent.');
                resolve(content);
            })
            .catch(function (err) {
                logger.error('Error: ' + utils.translateError(err));
                reject(err);
            });
    });
};

module.exports = {
    addNewScript: addNewScript,
    deleteScript: deleteScript,
    getAllScripts: getAllScripts,
    getDefaultScripts: getDefaultScripts,
    getScriptContent: getScriptContent,
    getDefaultScriptContent: getDefaultScriptContent
};
