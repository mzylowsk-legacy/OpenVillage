'use strict';

var constants = require('../components/constants'),
    logger = require('../lib/logger/logger').init(),
    buildsEntities = require('../entities/builds-entities'),
    mailTools = require('../lib/utils/mailer-tools'),
    utils = require('../lib/utils/others'),
    Q = require('q');

var sendReport = function(newReport, owner) {
    return Q.Promise(function (resolve, reject) {
        if (newReport && newReport.selectedProjects) {
            buildsEntities.findBuildsByProjectNamesAndOwner(newReport.selectedProjects.map(function (p) {
                return p.name;
            }), owner)
            .then(function (builds) {
                var selectedProjectDescription = '';
                newReport.selectedProjects.forEach(function(p) {
                    var succeededBuilds = 0,
                        failedBuilds = 0;
                    var projectBuilds = builds.filter(function(build) {
                        return build.projectName === p.name;
                    });
                    projectBuilds.forEach(function(build) {
                        build.status_code === 0 ? succeededBuilds++ : failedBuilds++;
                    });
                    selectedProjectDescription += p.name + ': builds succeeded - ' + succeededBuilds + ', failed - ' + failedBuilds + '\n';
                });

                mailTools.sendEmail(
                    newReport.email,
                    'Report from OpenVillage',
                    'Number of all projects: ' + newReport.numOfAllProjects +
                    '\nNumber of projects added after date ' + newReport.selectedDate.substring(0,10) + ': ' + newReport.numOfLatestProjects +
                    '\n\nInformation about builds:\n' + selectedProjectDescription);
                resolve();
            })
            .catch(function (err) {
                logger.error('Error: ' + utils.translateError(err));
                reject(err);
            });
        }
    });
};

module.exports = {
    sendReport : sendReport
};

