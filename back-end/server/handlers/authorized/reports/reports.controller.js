'use strict';

var _ = require('lodash'),
    reportsManager = require('../../../api/reports'),
    httpStatuses = require('../../../components/http-statuses');

exports.sendReport = function(req, res) {
    reportsManager.sendReport(req.body, req.user.username)
        .then(function(result) {
            res.send(result);
        })
        .catch(function(err) {
            res.status(err.status || httpStatuses.Generic.InternalServerError.status).send(err);
        });
};