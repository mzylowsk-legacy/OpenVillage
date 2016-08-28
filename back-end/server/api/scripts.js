'use strict';

var scriptsFileEntities = require('../entities/scripts-file-entities'),
    httpStatuses = require('../components/http-statuses'),
    logger = require('../lib/logger/logger').init(),
    utils = require('../lib/utils/others'),
    Q = require('q');


var addNewScript = function (scriptEntity, owner) {
    return Q.Promise(function (resolve, reject) {
        scriptsFileEntities.saveScript(scriptEntity.name, scriptEntity.code, owner)
            .then(function () {
                logger.debug('Script %s has been saved in %s catalog.', scriptEntity.name, owner);
                resolve(httpStatuses.Scripts.Created);
            })
            .catch(function (err) {
                logger.error('Error: ' + utils.translateError(err));
                reject(err);
            })
    });
};

var deleteScript = function (name, owner) {
    return Q.Promise(function (resolve, reject) {
        scriptsFileEntities.isExistingScript(name, owner)
            .then(function () {
                logger.debug('Script %s has been found.', name);
                return scriptsFileEntities.deleteScript(name, owner);
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

var getAllScripts = function (owner) {
    return Q.Promise(function (resolve, reject) {
        scriptsFileEntities.getAllScripts(owner)
            .then(function (scripts) {
                logger.debug('Scripts for %s listed.', owner);
                resolve(scripts);
            })
            .catch(function (err) {
                logger.error('Error: ' + utils.translateError(err));
                reject(err);
            })
    });
};

var getScriptContent = function (name, owner) {
    return Q.Promise(function (resolve, reject) {
        scriptsFileEntities.isExistingScript(name, owner)
            .then(function () {
                logger.debug('Script %s has been found', name);
                return scriptsFileEntities.getScriptContent(name, owner);
            })
            .then(function (content) {
                logger.debug('Script for %s has been sent.', owner);
                resolve(content);
            })
            .catch(function (err) {
                logger.error('Error: ' + utils.translateError(err));
                reject(err);
            })
    });
};

module.exports = {
    addNewScript: addNewScript,
    deleteScript: deleteScript,
    getAllScripts: getAllScripts,
    getScriptContent: getScriptContent
};
