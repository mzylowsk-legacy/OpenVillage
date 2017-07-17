'use strict';

var express = require('express');
var controller = require('./builds.controller.js');

var router = express.Router();

router.post('/run', controller.runBuild);
router.get('/get/:name', controller.getBuildByName);
router.get('/project/:projectName', controller.getBuildsByProjectName);
router.get('/project/zip/:projectName/:commitSHA', controller.getZipPackage);

module.exports = router;