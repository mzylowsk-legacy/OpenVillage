'use strict';

var express = require('express');
var controller = require('./projects.controller.js');

var router = express.Router();

router.post('/add', controller.addNewProject);
router.get('/list', controller.getProjects);
router.get('/:name/details', controller.getProject);
router.get('/:name/branches', controller.getProjectWithBranches);
router.delete('/delete/:name', controller.deleteProject);
router.put('/:projectName/autoScript', controller.setAsAutoScript);
router.put('/edit', controller.editProject);

module.exports = router;