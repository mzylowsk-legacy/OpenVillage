'use strict';

var userEntities = require('../entities/users-entities'),
    tokenEntities = require('../entities/token-entities'),
    httpStatuses = require('../components/http-statuses'),
    constants = require('../components/constants'),
    logger = require('../lib/logger/logger').init(),
    securityTools = require('../lib/utils/security-tools'),
    mailTools = require('../lib/utils/mailer-tools'),
    utils = require('../lib/utils/others');

var throwError = function (message) {
    logger.debug(message);
    throw message;
};

var addUser = function (newUser, callback) {
    var activationToken = securityTools.generateUserToken(newUser.username);
    userEntities.findUserByEmail(newUser.email)
        .then(function (user) {
            if (!user) {
                logger.debug('New user ' + newUser.username + ' not found by email in database.');
                return userEntities.findUserByUsername(newUser.username);
            } else {
                throwError(httpStatuses.Users.AlreadyExists);
            }
        })
        .then(function (user) {
            if (!user) {
                logger.debug('New user ' + newUser.username + ' not found by username in database.');
                newUser.password = securityTools.hashPassword(newUser.password);
                newUser.activated = false;
                newUser.created = Date.now();
                return userEntities.addUser(newUser);
            } else {
                throwError(httpStatuses.Users.AlreadyExists);
            }
        })
        .then(function () {
            logger.debug('User ' + newUser.username + ' has been added to database.');
            return tokenEntities.addToken(newUser.username, activationToken, constants.token.type.activation);
        })
        .then(function () {
            logger.debug('Activation token for ' + newUser.username + ' user has been added to database.');
            return mailTools.sendEmail(
                newUser.email,
                constants.email.types.accountActivation.subject,
                constants.email.types.accountActivation.content(newUser.username, activationToken));
        })
        .then(function () {
            logger.debug('Email with activation link has been sent to ' + newUser.email);
            callback(null, httpStatuses.Users.Created);
        })
        .catch(function (err) {
            logger.error('Error: ' + utils.translateError(err));
            if (err.status !== httpStatuses.Users.AlreadyExists.status) {
                logger.debug('Cleaning steps done before error had been thrown.');
                userEntities.deleteUserByEmail(newUser.email);
                tokenEntities.deleteByUsernameAndType(newUser.username, constants.token.type.activation);
            }
            callback(err, null);
        });
};

var activateUser = function (options, callback) {
    userEntities.findUserByUsername(options.username)
        .then(function (user) {
            if (user) {
                logger.debug('User ' + options.username + ' has been found in database.');
                if (!user.activated) {
                    return tokenEntities.findTokenByUsernameAndType(options.username, constants.token.type.activation);
                } else {
                    throwError(httpStatuses.Users.AlreadyActivated);
                }
            } else {
                throwError(httpStatuses.Users.NotExists);
            }
        })
        .then(function (tokenResult) {
            if (tokenResult && options.token === tokenResult.token) {
                logger.debug('Token delivered by ' + options.username + ' has been verified.');
                return userEntities.activateByUsername(options.username);
            } else {
                throwError(httpStatuses.Auth.InvalidToken);
            }
        })
        .then(function () {
            logger.debug('User ' + options.username + ' has been activated.');
            return tokenEntities.deleteByUsernameAndType(options.username, constants.token.type.activation);
        })
        .then(function () {
            logger.debug('Activation token for ' + options.username + ' has been removed from database.');
            callback(null, httpStatuses.Users.Activated);
        })
        .catch(function (err) {
            logger.error('Error: ' + utils.translateError(err));
            callback(err, null);
        });
};

var logInUser = function (options, callback) {
    userEntities.findUserByUsername(options.username)
        .then(function (user) {
            if (user) {
                logger.debug('User ' + options.username + ' has been found in database.');
                if (securityTools.verifyPasswordHash(options.password, user.password)) {
                    logger.debug('Password for user ' + options.username + ' has been found verified.');
                    if (user.activated) {
                        logger.debug('User authorized: Token send.');
                        callback(null, {token: securityTools.generateUserToken(user.username)});
                    } else {
                        throwError(httpStatuses.Users.NotActivated);
                    }
                } else {
                    throwError(httpStatuses.Auth.Unauthorized);
                }
            } else {
                throwError(httpStatuses.Users.NotExists);
            }
        })
        .catch(function (err) {
            logger.error('Error: ' + utils.translateError(err));
            callback(err, null);
        });
};

var forgotPassword = function (options, callback) {
    var resetPasswordToken = securityTools.generateUserToken(options.email);
    var userEntity = {};
    userEntities.findUserByEmail(options.email)
        .then(function (user) {
            if (user) {
                logger.debug('User ' + options.email + ' has been found in database.');
                userEntity = user;
                return tokenEntities.addToken(user.username, resetPasswordToken, constants.token.type.resetPassword);
            } else {
                throwError(httpStatuses.Users.NotExists);
            }
        })
        .then(function () {
            logger.debug('Token for ' + options.email + ' has been added to database.');
            return mailTools.sendEmail(
                options.email,
                constants.email.types.resetPassword.subject,
                constants.email.types.resetPassword.content(userEntity.username, resetPasswordToken));
        })
        .then(function () {
            logger.debug('Email with reset password link has been sent to ' + options.email);
            callback(null, httpStatuses.Users.ResetPasswordTokenSent);
        })
        .catch(function (err) {
            logger.error('Error: ' + utils.translateError(err));
            callback(err, null);
        });
};

var resetPassword = function (options, callback) {
    userEntities.findUserByUsername(options.username)
        .then(function (user) {
            if (user) {
                logger.debug('User ' + options.username + ' has been found in database.');
                return tokenEntities.findTokenByUsernameAndType(options.username, constants.token.type.resetPassword);
            } else {
                throwError(httpStatuses.Users.NotExists);
            }
        })
        .then(function (tokenResult) {
            if (tokenResult && tokenResult.token === options.token) {
                logger.debug('Reset token for ' + options.username + ' user has been verified.');
                return userEntities.setNewPasswordForUsername(options.username, securityTools.hashPassword(options.newPassword));
            } else {
                throwError(httpStatuses.Auth.InvalidToken);
            }
        })
        .then(function () {
            logger.debug('New password for ' + options.email + ' has been set.');
            return tokenEntities.deleteByUsernameAndType(options.username, constants.token.type.resetPassword);
        })
        .then(function () {
            logger.debug('Reset token for ' + options.username + ' has been removed from database.');
            callback(null, httpStatuses.Users.PasswordChanged);
        })
        .catch(function (err) {
            logger.error('Error: ' + utils.translateError(err));
            callback(err, null);
        });
};

var getUserProfile = function (username, callback) {
    userEntities.getUserProfile(username)
        .then(function (user) {
            delete user.password;
            delete user._id;
            delete user.activated;
            callback(null, user);
        })
        .catch(function (err) {
            logger.error('Error: ' + utils.translateError(err));
            callback(err, null);
        });
};

module.exports = {
    addUser: addUser,
    activateUser: activateUser,
    logInUser: logInUser,
    forgotPassword: forgotPassword,
    resetPassword: resetPassword,
    getUserProfile: getUserProfile
};