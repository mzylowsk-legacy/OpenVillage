'use strict';

var bcrypt = require('bcrypt'),
    config = require('../../config/config'),
    jwt = require('jsonwebtoken');


module.exports.generateUserToken = function (username) {
    return jwt.sign({username: username}, config.auth.key, {expiresIn: config.auth.expirationTokenTime});
};

module.exports.hashPassword = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

module.exports.verifyPasswordHash = function (hash, password) {
    return bcrypt.compareSync(hash, password);
};

module.exports.encrypt = function (text) {
    return Buffer.from(text).toString('base64');
};

module.exports.decrypt = function (encryptedText) {
    return Buffer.from(encryptedText, 'base64').toString();
};