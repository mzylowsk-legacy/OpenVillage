'use strict';

var buildsManager = require('../../../api/builds'),
    schemaValidator = require('../../../lib/schema-validator'),
    projectsSchemas = require('../../../schemas/builds-schema.json'),
    httpStatuses = require('../../../components/http-statuses');

exports.runBuild = function (req, res) {
    var errors = schemaValidator.validate(req.body, projectsSchemas.runBuild).errors;
    if (errors.length) {
        res.status(400).send(errors);
        return;
    }
    buildsManager.runBuild(req.body, req.user.username)
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            res.status(err.status || httpStatuses.Generic.InternalServerError.status).send(err);
        });
};
