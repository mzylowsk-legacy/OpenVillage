'use strict';

var express = require('express');
var controller = require('./scripts.controller.js');

var router = express.Router();

router.post('/add', controller.addNewScript);
router.get('/list', controller.getAllScripts);
router.delete('/delete/:name', controller.deleteScript);
router.get('/content/:name', controller.getScriptContent);

module.exports = router;
