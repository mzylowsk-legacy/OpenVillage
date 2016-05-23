'use strict';

var _ = require('lodash'),
    usersManager = require('../../api/users'),
    schemaValidator = require('../../lib/schema-validator'),
    userSchemas = require('.././../schemas/users-schema.json'),
    httpStatuses = require('../../components/http-statuses');

// Create a new user
exports.addUser = function(req, res) {
    var errors = schemaValidator.validate(req.body, userSchemas.addUser).errors;
    if(errors.length) {
        res.status(400).send(errors);
        return;
    }
    usersManager.addUser(req.body, function(err, result) {
        if(!err && result) {
            res.send(result);
        } else {
            res.status(err.status || httpStatuses.Generic.InternalServerError.status).send(err);
        }
    });
};

exports.activateUser = function(req, res) {
    usersManager.activateUser(req.params, function(err, result) {
        if(!err && result) {
            res.redirect('/activated');
        } else {
            res.redirect('/activation_error');
        }
    });
};

exports.logInUser = function(req, res) {
    var errors = schemaValidator.validate(req.body, userSchemas.loginUser).errors;
    if(errors.length) {
        res.status(400).send(errors);
        return;
    }
    usersManager.logInUser(req.body, function(err, result) {
        if(!err && result) {
            res.send(result);
        } else {
            res.status(err.status || httpStatuses.Generic.InternalServerError.status).send(err);
        }
    });
};

exports.forgotPassword = function(req, res) {
    var errors = schemaValidator.validate(req.body, userSchemas.forgotPassword).errors;
    if(errors.length) {
        res.status(400).send(errors);
        return;
    }
    usersManager.forgotPassword(req.body, function(err, result) {
        if(!err && result) {
            res.send(result);
        } else {
            res.status(err.status || httpStatuses.Generic.InternalServerError.status).send(err);
        }
    });
};

exports.resetPassword = function(req, res) {
    var errors = schemaValidator.validate(req.body, userSchemas.resetPassword).errors;
    if(errors.length) {
        res.status(400).send(errors);
        return;
    }
    var options = {
        username: req.params.username,
        token: req.params.token,
        newPassword: req.body.newPassword
    };
    usersManager.resetPassword(options, function(err, result) {
        if(!err && result) {
            res.send(result);
        } else {
            res.status(err.status || httpStatuses.Generic.InternalServerError.status).send(err);
        }
    });
};