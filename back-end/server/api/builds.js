'use strict';

var projectsEntities = require('../entities/projects-entities'),
    httpStatuses = require('../components/http-statuses'),
    constants = require('../components/constants'),
    logger = require('../lib/logger/logger').init(),
    utils = require('../lib/utils/others'),
    Q = require('q');


var runBuild = function (buildEntity, owner) {
    return Q.Promise(function (resolve, reject) {
        projectsEntities.findProjectByNameAndOwner(buildEntity.projectName, owner)
            .then(function (project) {
                if (project) {
                    logger.debug('Project %s has been found', buildEntity.projectName);
                    utils.spawnProcess('sh', constants.builder.uberScriptPath + ' lista argumentow');
                    logger.debug('Building process has been triggered');
                    resolve(httpStatuses.Builds.Triggered);
                } else {
                    utils.throwError(httpStatuses.Projects.NotExists);
                }
            })
            .catch(function (err) {
                logger.error('Error: ' + utils.translateError(err));
                reject(err);
            })
    });
};

module.exports = {
    runBuild: runBuild
};
