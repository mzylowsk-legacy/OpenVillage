'use strict';

var express = require('express');
var controller = require('./reports.controller.js');

var router = express.Router();
router.post('/send', controller.sendReport);

module.exports = router;