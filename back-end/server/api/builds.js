'use strict';

var projectsEntities = require('../entities/projects-entities'),
    httpStatuses = require('../components/http-statuses'),
    constants = require('../components/constants'),
    logger = require('../lib/logger/logger').init(),
    utils = require('../lib/utils/others'),
    config = require('../config/config'),
    path = require('path'),
    Q = require('q');


var addComandArg = function(argName, argValue, argsArray) {
    argsArray.push(argName);
    argsArray.push(argValue);
};

var runBuild = function (buildEntity, owner) {
    return Q.Promise(function (resolve, reject) {
        projectsEntities.findProjectByNameAndOwner(buildEntity.projectName, owner)
            .then(function (project) {
                if (project) {
                    logger.debug('Project %s has been found', buildEntity.projectName);
                    var args = [constants.builder.uberScriptPath];
                    addComandArg('--project-owner', project.owner, args);
                    addComandArg('--project-name', project.name, args);
                    addComandArg('--project-version', buildEntity.projectVersion, args);
                    addComandArg('--github-url', project.url, args);
                    addComandArg('--destination', path.join(config.builder.workspace.path, owner, 'builds'), args);
                    addComandArg('--mongo-host', config.mongodb.host, args);
                    addComandArg('--mongo-port', config.mongodb.port, args);
                    addComandArg('--mongo-database-name', config.mongodb.databaseName, args);
                    addComandArg('--mongo-collection-name', config.mongodb.collectionName, args);

                    if (project.username && project.password) {
                        addComandArg('--username', project.username, args);
                        addComandArg('--password', project.password, args);
                    }

                    if (buildEntity.steps.length) {
                        for(var i in buildEntity.steps) {
                            if (buildEntity.steps[i].args) {
                                addComandArg('--build-steps', '"' + buildEntity.steps[i].scriptName + ' ' + buildEntity.steps[i].args + '"', args);
                            } else {
                                addComandArg('--build-steps', buildEntity.steps[i].scriptName, args);
                            }
                        }
                    }

                    logger.debug('Spawning process: python ' + args);
                    utils.spawnProcess('python', args);
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
