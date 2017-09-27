'use strict';

var express = require('express');
var controller = require('./builds.controller.js');

var router = express.Router();

router.post('/run', controller.runBuild);
router.post('/cron', controller.setCronJob);
router.get('/get/:name', controller.getBuildByName);
router.get('/diff/:name', controller.getDiff);
router.get('/project/:projectName', controller.getBuildsByProjectName);
router.get('/project/:projectNames', controller.getBuildsByProjectsName)
router.get('/project/zip/:projectName/:commitSHA', controller.getZipPackage);

module.exports = router;