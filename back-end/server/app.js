/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
var userConfig = require('./config/config')

// Setup server
var app = express();
var server = require('http').createServer(app);

//Setup an Agenda connection
var Agenda = require('agenda');
var agenda = new Agenda({db: {address: userConfig.mongodb.host + ':' + userConfig.mongodb.port + '/' + userConfig.mongodb.databaseName,
    collection: 'agenda'},
    options: {ssl: true}});

require('./config/express')(app);
require('./routes')(app);
require('./jobs/jobs');

process.on('unhandledRejection', function (reason, p) {
    console.log('Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});

process.on('unhandledException', function (err) {
    console.log('Possibly Unhandled Exception at: Promise ', err);
});

// Start server
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

//Start agenda
agenda.on('ready', function() {
    agenda.start();
});

// Expose app
exports = module.exports = app;
