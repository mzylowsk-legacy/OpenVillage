'use strict';

var generic = {
    InternalServerError: { status: 500, message: "Internal Server Error" }
};

var auth = {
    //errors
    Unauthorized: {status: 401, group: "Auth", ID: "Unauthorized"},
    PasswordEmpty: {status: 400, group: 'Auth', ID: "PasswordEmpty"},
    InvalidToken: {status: 401, group: 'Auth', ID: "InvalidToken."}
};

var users = {
    //success
    Created: {status: 201, group: 'Users', ID: "Created"},
    Activated: {status: 204, group: 'Users', ID: 'Activated'},
    ResetPasswordTokenSent: {status: 200, group: 'Users', ID: 'ResetPasswordTokenSent'},
    PasswordChanged: {status: 200, group: 'Users', ID: 'PasswordChanged'},
    Updated: {status: 204, group: 'Users', ID: 'Updated'},
    //errors
    AlreadyExists: {status: 409, group: 'Users', ID: 'AlreadyExists'},
    AlreadyActivated: {status: 404, group: 'Users', ID: 'AlreadyActivated'},
    NotExists: {status: 404, group: 'Users', ID: 'NotExists'},
    NotActivated: {status: 404, group: 'Users', message: 'NotActivated'}
};

module.exports = {
    Generic: generic,
    Auth: auth,
    Users: users
};
