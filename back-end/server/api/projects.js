'use strict';

var projectsEntities = require('../entities/projects-entities'),
    branchesManager = require('../api/branches'),
    httpStatuses = require('../components/http-statuses'),
    logger = require('../lib/logger/logger').init(),
    utils = require('../lib/utils/others'),
    Q = require('q');

var addNewProject = function (projectEntity, owner) {
    return Q.Promise(function (resolve, reject) {
        projectsEntities.findProjectByNameAndOwner(projectEntity.name, owner, false)
            .then(function (exist) {
                if (!exist) {
                    projectEntity.owner = owner;
                    return projectsEntities.addProject(projectEntity);
                } else {
                    utils.throwError(httpStatuses.Projects.AlreadyExists);
                }
            })
            .then(function () {
                logger.debug('Project ' + projectEntity.name + ' has been added to the database.');
                resolve(httpStatuses.Projects.Created);
            })
            .catch(function (err) {
                logger.error('Error: ' + utils.translateError(err));
                reject(err);
            });
    });
};

var deleteProject = function (name, owner) {
    return Q.Promise(function (resolve, reject) {
        projectsEntities.findProjectByNameAndOwner(name, owner, false)
            .then(function(project) {
                if(project) {
                    logger.debug('Project ' + name + ' (user: ' + owner + ') has been found.');
                    return projectsEntities.deleteProjectByNameAndOwner(name, owner);
                } else {
                    utils.throwError(httpStatuses.Projects.NotExists);
                }
            })
            .then(function () {
                logger.debug('Project ' + name + ' has been deleted from database.');
                resolve(httpStatuses.Projects.Removed);
            })
            .catch(function (err) {
                logger.error('Error: ' + utils.translateError(err));
                reject(err);
            });
    });
};

var getProjects = function (owner) {
    return Q.Promise(function (resolve, reject) {
        projectsEntities.findProjectsByOwner(owner)
            .then(function (projects) {
                logger.debug('Projects for ' + owner + ' listed.');
                resolve(projects);
            })
            .catch(function (err) {
                logger.error('Error: ' + utils.translateError(err));
                reject(err);
            });
    });
};

var getProject = function (name, owner) {
    return Q.Promise(function (resolve, reject) {
        projectsEntities.findProjectByNameAndOwner(name, owner, true)
            .then(function (project) {
                if (project) {
                    logger.debug('Project for ' + owner + ' found.');
                    branchesManager.findAllBranchesForProject(project)
                        .then(function(project)
                        {
                            logger.debug('Branches for ' + name + ' found.');
                            project.password = 0;
                            resolve(project);
                        })
                        .catch(function(err)
                        {
                            logger.error('Error: ' + utils.translateError(err));
                            reject(err);
                        });
                } else {
                    utils.throwError(httpStatuses.Projects.NotExists);
                }
            })
            .catch(function (err) {
                logger.error('Error: ' + utils.translateError(err));
                reject(err);
            });
    });
};

var setAsAutoScript = function (projectName, owner, scriptName) {
    return Q.Promise(function (resolve, reject) {
        projectsEntities.setAsAutoScript(projectName, owner, scriptName)
            .then(function (result) {
                if (result) {
                    resolve(result);
                } else {
                    utils.throwError(httpStatuses.Projects.NotExists);
                }
            })
            .catch(function (err) {
                logger.error('Error: ' + utils.translateError(err));
                reject(err);
            });
    });
}

module.exports = {
    addNewProject: addNewProject,
    deleteProject: deleteProject,
    getProjects: getProjects,
    getProject: getProject,
    setAsAutoScript: setAsAutoScript
};
