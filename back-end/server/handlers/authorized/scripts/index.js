'use strict';

var express = require('express');
var controller = require('./scripts.controller.js');

var router = express.Router();

router.post('/add', controller.addNewScript);
router.put('/edit', controller.editScript);
router.get('/list', controller.getAllScripts);
router.get('/defaults', controller.getDefaultScripts);
router.delete('/delete/:name', controller.deleteScript);
router.get('/content/:name', controller.getScriptContent);
router.get('/default/content/:name', controller.getDefaultScriptContent);

module.exports = router;
