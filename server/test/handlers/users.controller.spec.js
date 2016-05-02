'use strict';

var expect = require('expect.js'),
    sinon = require('sinon'),
    rewire = require('rewire'),
    httpStatuses = require('../../components/http-statuses'),
    usersHandler = rewire('../../handlers/users/users.controller');

describe('HANDLER users', function () {

    var resMock, reqMock, usersManagerMock, error, result;
    beforeEach(function () {
        reqMock = {
            body: {},
            params: {}
        };
        resMock = {
            send: sinon.spy(),
            status: sinon.stub().returns({
                send: sinon.spy()
            }),
            redirect: sinon.spy()
        };
        usersManagerMock = {};
        error = 'error';
        result = 'result';
    });

    describe('addUser', function () {

        it('should add user if everything is good', function (done) {
            // prepare
            usersManagerMock.addUser = sinon.stub().callsArgWith(1, null, result);
            usersHandler.__set__('usersManager', usersManagerMock);
            reqMock.body = {
                username: 'username',
                password: 'password',
                email: 'email',
                name: 'name',
                surname: 'surname'
            };
            // execute
            usersHandler.addUser(reqMock, resMock);
            // attest
            expect(resMock.send.calledOnce).to.equal(true);
            expect(resMock.send.calledWith(result)).to.equal(true);

            done();
        });

        it('should not add user if something was wrong', function (done) {
            // prepare
            usersManagerMock.addUser = sinon.stub().callsArgWith(1, error, null);
            usersHandler.__set__('usersManager', usersManagerMock);
            reqMock.body = {
                username: 'username',
                password: 'password',
                email: 'email',
                name: 'name',
                surname: 'surname'
            };
            // execute
            usersHandler.addUser(reqMock, resMock);
            // attest
            expect(resMock.status.calledOnce).to.equal(true);
            expect(resMock.status.calledWith(httpStatuses.Generic.InternalServerError.status)).to.equal(true);

            done();
        });

        it('should not add user if request body is invalid', function (done) {
            // prepare
            reqMock.body = {
                username: 'username',
                email: 'email',
                name: 'name',
                surname: 'surname'
            };
            // execute
            usersHandler.addUser(reqMock, resMock);
            // attest
            expect(resMock.status.calledOnce).to.equal(true);
            expect(resMock.status.calledWith(400)).to.equal(true);

            done();
        });

    });

    describe('activateUser', function () {

        it('should activate user if everything is good', function (done) {
            // prepare
            usersManagerMock.activateUser = sinon.stub().callsArgWith(1, null, result);
            usersHandler.__set__('usersManager', usersManagerMock);
            // execute
            usersHandler.activateUser(reqMock, resMock);
            // attest
            expect(resMock.redirect.calledOnce).to.equal(true);
            expect(resMock.redirect.calledWith('/accountActivationSuccess')).to.equal(true);

            done();
        });

        it('should not activate user if something was wrong', function (done) {
            // prepare
            usersManagerMock.activateUser = sinon.stub().callsArgWith(1, error, null);
            usersHandler.__set__('usersManager', usersManagerMock);
            // execute
            usersHandler.activateUser(reqMock, resMock);
            // attest
            expect(resMock.redirect.calledOnce).to.equal(true);
            expect(resMock.redirect.calledWith('/accountActivationError')).to.equal(true);

            done();
        });
    });

    describe('logInUser', function () {

        it('should login user if everything is good', function (done) {
            // prepare
            usersManagerMock.logInUser = sinon.stub().callsArgWith(1, null, result);
            usersHandler.__set__('usersManager', usersManagerMock);
            reqMock.body = {
                username: 'username',
                password: 'password'
            };
            // execute
            usersHandler.logInUser(reqMock, resMock);
            // attest
            expect(resMock.send.calledOnce).to.equal(true);
            expect(resMock.send.calledWith(result)).to.equal(true);

            done();
        });

        it('should not login user if something was wrong', function (done) {
            // prepare
            usersManagerMock.logInUser = sinon.stub().callsArgWith(1, error, null);
            usersHandler.__set__('usersManager', usersManagerMock);
            reqMock.body = {
                username: 'username',
                password: 'password'
            };
            // execute
            usersHandler.logInUser(reqMock, resMock);
            // attest
            expect(resMock.status.calledOnce).to.equal(true);
            expect(resMock.status.calledWith(httpStatuses.Generic.InternalServerError.status)).to.equal(true);

            done();
        });

        it('should not add user if request body is invalid', function (done) {
            // prepare
            reqMock.body = {
                username: 'username'
            };
            // execute
            usersHandler.logInUser(reqMock, resMock);
            // attest
            expect(resMock.status.calledOnce).to.equal(true);
            expect(resMock.status.calledWith(400)).to.equal(true);

            done();
        });

    });

    describe('forgotPassword', function () {

        it('should send reset token if everything is good', function (done) {
            // prepare
            usersManagerMock.forgotPassword = sinon.stub().callsArgWith(1, null, result);
            usersHandler.__set__('usersManager', usersManagerMock);
            reqMock.body = {
                email: 'email'
            };
            // execute
            usersHandler.forgotPassword(reqMock, resMock);
            // attest
            expect(resMock.send.calledOnce).to.equal(true);
            expect(resMock.send.calledWith(result)).to.equal(true);

            done();
        });

        it('should not send reset token if something was wrong', function (done) {
            // prepare
            usersManagerMock.forgotPassword = sinon.stub().callsArgWith(1, error, null);
            usersHandler.__set__('usersManager', usersManagerMock);
            reqMock.body = {
                email: 'email'
            };
            // execute
            usersHandler.forgotPassword(reqMock, resMock);
            // attest
            expect(resMock.status.calledOnce).to.equal(true);
            expect(resMock.status.calledWith(httpStatuses.Generic.InternalServerError.status)).to.equal(true);

            done();
        });

        it('should not add user if request body is invalid', function (done) {
            // prepare
            reqMock.body = {};
            // execute
            usersHandler.forgotPassword(reqMock, resMock);
            // attest
            expect(resMock.status.calledOnce).to.equal(true);
            expect(resMock.status.calledWith(400)).to.equal(true);

            done();
        });

    });

    describe('resetPassword', function () {

        it('should resetPassword if everything is good', function (done) {
            // prepare
            usersManagerMock.resetPassword = sinon.stub().callsArgWith(1, null, result);
            usersHandler.__set__('usersManager', usersManagerMock);
            reqMock.body = {
                newPassword: 'newpass'
            };
            // execute
            usersHandler.resetPassword(reqMock, resMock);
            // attest
            expect(resMock.send.calledOnce).to.equal(true);
            expect(resMock.send.calledWith(result)).to.equal(true);

            done();
        });

        it('should not reset password if something was wrong', function (done) {
            // prepare
            usersManagerMock.resetPassword = sinon.stub().callsArgWith(1, error, null);
            usersHandler.__set__('usersManager', usersManagerMock);
            reqMock.body = {
                newPassword: 'newpassword'
            };
            // execute
            usersHandler.resetPassword(reqMock, resMock);
            // attest
            expect(resMock.status.calledOnce).to.equal(true);
            expect(resMock.status.calledWith(httpStatuses.Generic.InternalServerError.status)).to.equal(true);

            done();
        });

        it('should not reset password if request body is invalid', function (done) {
            // prepare
            reqMock.body = {};
            // execute
            usersHandler.resetPassword(reqMock, resMock);
            // attest
            expect(resMock.status.calledOnce).to.equal(true);
            expect(resMock.status.calledWith(400)).to.equal(true);

            done();
        });

    });

});
