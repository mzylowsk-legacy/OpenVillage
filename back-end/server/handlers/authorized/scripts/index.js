'use strict';

var express = require('express');
var controller = require('./scripts.controller.js');

var router = express.Router();

router.post('/add/:projectName', controller.addNewScript);
router.put('/edit/:projectName', controller.editScript);
router.get('/list/:projectName', controller.getAllScripts);
router.get('/defaults', controller.getDefaultScripts);
router.delete('/delete/:projectName/:name', controller.deleteScript);
router.get('/content/:projectName/:name', controller.getScriptContent);
router.get('/default/content/:name', controller.getDefaultScriptContent);

module.exports = router;
