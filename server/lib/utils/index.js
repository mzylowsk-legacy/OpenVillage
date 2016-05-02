'use strict';

var bcrypt = require('bcrypt'),
    Q = require('q'),
    mailer = require('../mailer/mailer'),
    jwt = require('jsonwebtoken'),
    config = require('../../config/config');

module.exports.sendEmail = function (email, subject, content) {
    var mailOptions = {
        from: config.emailProvider.from,
        to: email,
        subject: '[OpenVillage] ' + subject,
        text: content
    };
    return Q.Promise(function(resolve, reject) {
        mailer.sendMail(mailOptions, function (err) {
            if(!err) {
                resolve();
            } else {
                reject(err);
            }
        });
    });
};

module.exports.generateUserToken = function (username) {
    return jwt.sign({ username: username }, config.auth.key, { expiresIn: config.auth.expirationTokenTime });
};

module.exports.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

module.exports.verifyPasswordHash = function (hash, password) {
    return bcrypt.compareSync(hash, password);
};