'use strict';

var mongo = require('mongoskin'),
    guid = require('guid'),
    buildsEntities = require('../entities/builds-entities'),
    projectsEntities = require('../entities/projects-entities'),
    usersEntities = require('../entities/users-entities'),
    scriptsEntities = require('../entities/scripts-file-entities'),
    builds = require('../api/builds'),
    config = require('../config/config'),
    CronJob = require('cron').CronJob,
    logger = require('../lib/logger/logger').init(),
    utils = require('../lib/utils/others'),
    mailTools = require('../lib/utils/mailer-tools'),
    httpStatuses = require('../components/http-statuses'),
    exec = require('child_process').exec,
    GitHub = require('octocat'),
    db = mongo.db(config.mongodb.host + ':' + config.mongodb.port + '/' + config.mongodb.databaseName, {native_parser: true});

var buildStatusNotifier = function() {

    buildsEntities.findFailedBuildsWithMailNotSent()
        .then(function (builds) {
            if (builds) {
                logger.debug('buildStatusNotifier found ' + builds.length + ' builds.');
                builds.forEach(function(build) {
                    usersEntities.findUserByUsername(build.owner)
                        .then(function (user) {
                            projectsEntities.findProjectByNameAndOwner(build.projectName, build.owner, false)
                                .then(function (project) {
                                   var userEmail = user.email
                                   var commitUrl = project.url + "/commit/" + build.commit_sha;

                                   var stepsCount = build.steps.length;
                                   var stepLog = "";
                                   if(stepsCount > 0){
                                        stepLog = build.steps[stepsCount-1].name +
                                                        ", status code " + build.steps[stepsCount-1].status_code;
                                   }

                                   mailTools.sendEmail(userEmail, "Build failed - " + build.buildName,
                                       "Build FAILED for project: " + project.name + "\n" +
                                       (stepLog !== "" ?  "on step: " + stepLog + "\n" : "") +
                                       "commit: " + commitUrl);
                                   buildsEntities.updateInfoAboutEmailSent(build);
                                })
                                .catch(function (err) {
                                    logger.error('Error: ' + utils.translateError(err));
                                });
                        })
                        .catch(function (err) {
                           logger.error('Error: ' + utils.translateError(err));
                        });
                });
            } else {
                utils.throwError(httpStatuses.Builds.NotExists);
            }
        })
        .catch(function (err) {
            logger.error('Error: ' + utils.translateError(err));
        });
}

var newCommitBuildTrigger = function() {
    projectsEntities.findAllProjects()
        .then(function (projects) {
            projects.forEach(function (project) {
                if(project.autoScript && project.autoScript !== ''){
                    scriptsEntities.isExistingScript(project.autoScript, project.owner)
                        .then(function () {
                            var tmpDirName = guid.raw();
                            exec('git clone ' + project.url + ' /tmp/' + tmpDirName + ' -q && ' +
                            'cd /tmp/' + tmpDirName + ' && git rev-parse master && cd .. && rm -rf /tmp/' + tmpDirName , function(err, stdout, stderr) {
                                if(err === null) {
                                    var commitSha = stdout.replace('\n','');
                                    buildsEntities.findBuildWithCommitSha(project.name, project.owner, commitSha)
                                        .then(function (buildRuns) {
                                            if(buildRuns.length === 0) {
                                                logger.info('Trigger build for project ' + project.name)
                                                var buildEntity =  {
                                                        projectVersion: 'master',
                                                        projectName: project.name,
                                                        steps: [ { scriptName: project.autoScript, public: false, args: '' } ]
                                                }
                                                builds.runBuild(buildEntity, project.owner)
                                            }
                                        })
                                } else {
                                    logger.warn("Cannot clone " + project.name)
                                }
                            });
                        })
                        .catch(function (err) {
                            logger.error('Error: ' + utils.translateError(err) + project.name);
                        })
                }
            });
        })
        .catch(function (err) {
            logger.error('Error: ' + utils.translateError(err));
        })
}

new CronJob('*/30 * * * * *', buildStatusNotifier, null, true, 'UTC');
new CronJob('5 * * * * *', newCommitBuildTrigger, null, true, 'UTC');
