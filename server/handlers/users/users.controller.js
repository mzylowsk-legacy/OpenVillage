'use strict';

var schemaValidator = require('../../lib/schema-validator'),
  usersSchemas = require('../../schemas/users-schema.json');

exports.test = function(req, res) {
  res.status(200).send({});
};