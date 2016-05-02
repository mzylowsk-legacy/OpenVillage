'use strict';

var expect = require('expect.js'),
    sinon = require('sinon'),
    rewire = require('rewire'),
    usersApi = rewire('../../api/users'),
    Q = require('q'),
    httpStatuses = require('../../components/http-statuses');

describe('API users', function () {

    var usersEntitiesMock, tokenEntitiesMock, options, callback, error, user;
    beforeEach(function () {
        callback = sinon.spy();
        error = 'error';
        options = {
            username: 'username',
            email: 'email'
        };
        user = {};
        usersEntitiesMock = {};
        tokenEntitiesMock = {};
    });

    describe('API addUser', function () {

        it('should not add user if something wrong', function (done) {
            // prepare

            // execute

            // attest

            done();
        });
    });

});
