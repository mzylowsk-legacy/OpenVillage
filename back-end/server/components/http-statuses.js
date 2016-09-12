'use strict';

var generic = {
    InternalServerError: { status: 500, message: 'Internal Server Error' }
};

var auth = {
    //errors
    Unauthorized: {status: 401, group: 'Auth', ID: 'Unauthorized'},
    PasswordEmpty: {status: 400, group: 'Auth', ID: 'PasswordEmpty'},
    InvalidToken: {status: 401, group: 'Auth', ID: 'InvalidToken.'}
};

var users = {
    //success
    Created: {status: 201, group: 'Users', ID: 'Created'},
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

var projects = {
    //success
    Created: {status: 201, group: 'Projects', ID: 'Created'},
    Removed: {status: 204, group: 'Projects', ID: 'Removed'},
    //errors
    AlreadyExists: {status: 409, group: 'Projects', ID: 'AlreadyExists'},
    NotExists: {status: 404, group: 'Projects', ID: 'NotExists'}
};

var scripts = {
    //success
    Created: {status: 201, group: 'Scripts', ID: 'Created'},
    Removed: {status: 204, group: 'Scripts', ID: 'Removed'}
};

var builds = {
    Triggered: {status: 202, group: 'Builds', ID: 'Triggered'},
    NotExists: {status: 404, group: 'Builds', ID: 'NotExists'}
};

module.exports = {
    Generic: generic,
    Auth: auth,
    Users: users,
    Projects: projects,
    Scripts: scripts,
    Builds: builds
};
