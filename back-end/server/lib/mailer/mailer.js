'use strict';

var nodemailer = require('nodemailer'),
    config = require('../../config/config');

var transporter = nodemailer.createTransport({
    host: config.emailProvider.host,
    port: config.emailProvider.port,
    secure: config.emailProvider.secure,
    connectionTimeout: config.emailProvider.connectionTimeout,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: config.emailProvider.username,
        pass: config.emailProvider.password
    }
});

module.exports = transporter;