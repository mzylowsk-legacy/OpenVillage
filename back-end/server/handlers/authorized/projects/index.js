'use strict';

var express = require('express');
var controller = require('./projects.controller.js');

var router = express.Router();

router.post('/add', controller.addNewProject);
router.get('/list', controller.getProjects);
router.delete('/delete/:name', controller.deleteProject);

module.exports = router;