'use strict';

var buildsManager = require('../../../api/builds'),
    schemaValidator = require('../../../lib/schema-validator'),
    buildsSchemas = require('../../../schemas/builds-schema.json'),
    httpStatuses = require('../../../components/http-statuses');

exports.runBuild = function (req, res) {
    var errors = schemaValidator.validate(req.body, buildsSchemas.runBuild).errors;
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

exports.getBuildByName = function (req, res) {
    buildsManager.getBuildByName(req.params.name, req.user.username)
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            res.status(err.status || httpStatuses.Generic.InternalServerError.status).send(err);
        });
};

exports.getBuildsByProjectName = function (req, res) {
    buildsManager.getBuildsByProjectName(req.params.projectName, req.user.username)
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            res.status(err.status || httpStatuses.Generic.InternalServerError.status).send(err);
        });
};

exports.getZipPackage = function (req, res) {
    buildsManager.getZipPackage(req.params.projectName, req.params.branchName, req.params.commitSHA, req.user.username)
        .then (function (result) {
            res.send(result);
        })
        .catch(function (err) {
            res.status(err.status || httpStatuses.Generic.InternalServerError.status).send(err);
        });
};
