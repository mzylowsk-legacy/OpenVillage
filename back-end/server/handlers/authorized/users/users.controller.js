'use strict';

var _ = require('lodash'),
    usersManager = require('../../../api/users'),
    httpStatuses = require('../../../components/http-statuses');

// Create a new user
exports.getUserProfile = function(req, res) {
    var username = req.user.username;
    usersManager.getUserProfile(username, function(err, result) {
        if(!err && result) {
            res.send(result);
        } else {
            res.status(err.status || httpStatuses.Generic.InternalServerError.status).send(err);
        }
    });
};