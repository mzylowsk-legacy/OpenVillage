'use strict';

var _ = require('lodash'),
    scriptsManager = require('../../../api/scripts'),
    schemaValidator = require('../../../lib/schema-validator'),
    scriptsSchemas = require('../../../schemas/scripts-schema.json'),
    httpStatuses = require('../../../components/http-statuses');

exports.addNewScript = function (req, res) {
    var errors = schemaValidator.validate(req.body, scriptsSchemas.addNewScript).errors;
    if (errors.length) {
        res.status(400).send(errors);
        return;
    }
    scriptsManager.addNewScript(req.body, req.user.username)
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            res.status(err.status || httpStatuses.Generic.InternalServerError.status).send(err);
        });
};

exports.deleteScript = function (req, res) {
    scriptsManager.deleteScript(req.params.name, req.user.username)
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            res.status(err.status || httpStatuses.Generic.InternalServerError.status).send(err);
        });
};

exports.getAllScripts = function (req, res) {
    scriptsManager.getAllScripts(req.user.username)
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            res.status(err.status || httpStatuses.Generic.InternalServerError.status).send(err);
        });
};

exports.getScriptContent = function (req, res) {
    scriptsManager.getScriptContent(req.params.name, req.user.username)
        .then(function (result) {
            res.send(result);
        })
        .catch(function (err) {
            res.status(err.status || httpStatuses.Generic.InternalServerError.status).send(err);
        });
};
