var config = require('../config/environment'),
  mongo = require('mongoskin'),
  db = mongo.db(config.mongo.uri, {native_parser: true});

db.bind('users');

module.exports.test = function() {

};
