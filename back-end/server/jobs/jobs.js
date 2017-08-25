'use strict';

var buildsEntities = require('../entities/builds-entities'),
    projectsEntities = require('../entities/projects-entities'),
    config = require('../config/config'),
    logger = require('../lib/logger/logger').init(),
    utils = require('../lib/utils/others'),
    mailTools = require('../lib/utils/mailer-tools'),
    usersEntities = require('../entities/users-entities'),
    CronJob = require('cron').CronJob,
    httpStatuses = require('../components/http-statuses');

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

var cron = new CronJob('*/30 * * * * *', buildStatusNotifier, null, true, 'UTC');
