'use strict';

var projectsEntities = require('../entities/projects-entities'),
    branchesManager = require('../api/branches'),
    httpStatuses = require('../components/http-statuses'),
    logger = require('../lib/logger/logger').init(),
    utils = require('../lib/utils/others'),
    securityTools = require('../lib/utils/security-tools'),
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

var getProjectWithBranches = function (name, owner) {
    return Q.Promise(function (resolve, reject) {
        projectsEntities.findProjectByNameAndOwner(name, owner, true)
            .then(function (project) {
                if (project) {
                    logger.debug('Project for ' + owner + ' found.');
                    branchesManager.findAllBranchesForProject(project)
                        .then(function(project)
                        {
                            logger.debug('Branches for ' + name + ' found.');
                            project.password = null;
                            resolve(project);
                        })
                        .catch(function(err)
                        {
                            logger.error('Error during fetching branches: ' + utils.translateError(err));
                            project.versions = [{name: 'master'}];
                            project.branchError = true;
                            reject(project);
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

var getProject = function (name, owner) {
    return Q.Promise(function (resolve, reject) {
        projectsEntities.findProjectByNameAndOwner(name, owner, false)
            .then(function (project) {
                if (project) {
                    logger.debug('Project for ' + owner + ' found.');
                    resolve(project);
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

var editProject = function (project, owner) {
    var projectEntity = {
        isPrivate: project.isPrivate,
        url: project.url,
        description: project.description
    };
    if (project.isPrivate) {
        projectEntity.username = project.username;
        projectEntity.password = securityTools.encrypt(project.password);
    } else {
        projectEntity.username = undefined;
        projectEntity.password = undefined;
    }
    return Q.Promise(function (resolve, reject) {
        projectsEntities.editProject(project.name, projectEntity, owner)
            .then(function () {
                logger.debug('Project ' + project.name + ' has been updated.');
                resolve(httpStatuses.Projects.Updated);
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
    getProjectWithBranches: getProjectWithBranches,
    editProject: editProject,
    setAsAutoScript: setAsAutoScript
};
