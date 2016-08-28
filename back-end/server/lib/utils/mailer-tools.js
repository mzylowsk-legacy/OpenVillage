'use strict';

var Q = require('q'),
    mailer = require('../mailer/mailer'),
    config = require('../../config/config');

module.exports.sendEmail = function (email, subject, content) {
    var mailOptions = {
        from: config.emailProvider.from,
        to: email,
        subject: '[OpenVillage] ' + subject,
        text: content
    };
    return Q.Promise(function (resolve, reject) {
        mailer.sendMail(mailOptions, function (err) {
            if (!err) {
                resolve();
            } else {
                reject(err);
            }
        });
    });
};