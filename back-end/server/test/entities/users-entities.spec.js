'use strict';

var expect = require('expect.js'),
    sinon = require('sinon'),
    rewire = require('rewire'),
    usersEntities = rewire('../../entities/users-entities');

describe('ENTITIES users-entities.js', function () {

    var dbMock, error, result;
    var email, username, newUser, newPassword, userAttributes;
    beforeEach(function () {
        dbMock = {
            bind: sinon.spy(),
            users: {}
        };
        result = 'result';
        error = 'InternalServerError';
        email = 'a@a';
        username = 'username';
        newUser = { username: username };
        newPassword = 'pass';
        userAttributes = { attrA: 'attrA_value' };
    });

    var compareObjects = function(objA, objB) {
        return JSON.stringify(objA) === JSON.stringify(objB);
    };

    describe('addUser', function () {

        it('should add user if everything is good', function () {
            // prepare
            dbMock.users.insert = sinon.stub().callsArgWith(1, null, result);
            usersEntities.__set__('db', dbMock);
            // execute && attest
            return usersEntities.addUser(newUser)
                .then(function(data) {
                    expect(compareObjects(data, result)).to.equal(true);
                });
        });

        it('should not add user if something was wrong', function () {
            // prepare
            dbMock.users.insert = sinon.stub().callsArgWith(1, error, null);
            usersEntities.__set__('db', dbMock);
            // execute && attest
            return usersEntities.addUser(newUser)
                .then(function(){})
                .catch(function(err) {
                    expect(compareObjects(err, error)).to.equal(true);
                });
        });

    });

    describe('findUserByEmail', function () {

        it('should find user if everything is good', function () {
            // prepare
            dbMock.users.findOne = sinon.stub().callsArgWith(1, null, result);
            usersEntities.__set__('db', dbMock);
            // execute && attest
            return usersEntities.findUserByEmail(email)
                .then(function(data) {
                    expect(compareObjects(data, result)).to.equal(true);
                });
        });

        it('should not find user if something was wrong', function () {
            // prepare
            dbMock.users.findOne = sinon.stub().callsArgWith(1, error, null);
            usersEntities.__set__('db', dbMock);
            // execute && attest
            return usersEntities.findUserByEmail(email)
                .then(function(){})
                .catch(function(err) {
                    expect(compareObjects(err, error)).to.equal(true);
                });
        });

    });

    describe('findUserByUsername', function () {

        it('should find user if everything is good', function () {
            // prepare
            dbMock.users.findOne = sinon.stub().callsArgWith(1, null, result);
            usersEntities.__set__('db', dbMock);
            // execute && attest
            return usersEntities.findUserByUsername(username)
                .then(function(data) {
                    expect(compareObjects(data, result)).to.equal(true);
                });
        });

        it('should not find user if something was wrong', function () {
            // prepare
            dbMock.users.findOne = sinon.stub().callsArgWith(1, error, null);
            usersEntities.__set__('db', dbMock);
            // execute && attest
            return usersEntities.findUserByUsername(username)
                .then(function(){})
                .catch(function(err) {
                    expect(compareObjects(err, error)).to.equal(true);
                });
        });

    });

    describe('deleteUserByEmail', function () {

        it('should find user if everything is good', function () {
            // prepare
            dbMock.users.remove = sinon.stub().callsArgWith(1, null, result);
            usersEntities.__set__('db', dbMock);
            // execute && attest
            return usersEntities.deleteUserByEmail(email)
                .then(function(data) {
                    expect(compareObjects(data, result)).to.equal(true);
                });
        });

        it('should not find user if something was wrong', function () {
            // prepare
            dbMock.users.remove = sinon.stub().callsArgWith(1, error, null);
            usersEntities.__set__('db', dbMock);
            // execute && attest
            return usersEntities.deleteUserByEmail(email)
                .then(function(){})
                .catch(function(err) {
                    expect(compareObjects(err, error)).to.equal(true);
                });
        });

    });

    describe('activateByUsername', function () {

        it('should find user if everything is good', function () {
            // prepare
            dbMock.users.update = sinon.stub().callsArgWith(3, null, result);
            usersEntities.__set__('db', dbMock);
            // execute && attest
            return usersEntities.activateByUsername(username)
                .then(function(data) {
                    expect(compareObjects(data, result)).to.equal(true);
                });
        });

        it('should not find user if something was wrong', function () {
            // prepare
            dbMock.users.update = sinon.stub().callsArgWith(3, error, null);
            usersEntities.__set__('db', dbMock);
            // execute && attest
            return usersEntities.activateByUsername(username)
                .then(function(){})
                .catch(function(err) {
                    expect(compareObjects(err, error)).to.equal(true);
                });
        });

    });

    describe('updateByUsername', function () {

        it('should find user if everything is good', function () {
            // prepare
            dbMock.users.update = sinon.stub().callsArgWith(3, null, result);
            usersEntities.__set__('db', dbMock);
            // execute && attest
            return usersEntities.updateByUsername(username)
                .then(function(data) {
                    expect(compareObjects(data, result)).to.equal(true);
                });
        });

        it('should not find user if something was wrong', function () {
            // prepare
            dbMock.users.update = sinon.stub().callsArgWith(3, error, null);
            usersEntities.__set__('db', dbMock);
            // execute && attest
            return usersEntities.updateByUsername(username)
                .then(function(){})
                .catch(function(err) {
                    expect(compareObjects(err, error)).to.equal(true);
                });
        });

    });

    describe('setNewPasswordForUsername', function () {

        it('should find user if everything is good', function () {
            // prepare
            dbMock.users.update = sinon.stub().callsArgWith(3, null, result);
            usersEntities.__set__('db', dbMock);
            // execute && attest
            return usersEntities.setNewPasswordForUsername(username)
                .then(function(data) {
                    expect(compareObjects(data, result)).to.equal(true);
                });
        });

        it('should not find user if something was wrong', function () {
            // prepare
            dbMock.users.update = sinon.stub().callsArgWith(3, error, null);
            usersEntities.__set__('db', dbMock);
            // execute && attest
            return usersEntities.setNewPasswordForUsername(username)
                .then(function(){})
                .catch(function(err) {
                    expect(compareObjects(err, error)).to.equal(true);
                });
        });

    });

    describe('setNewPasswordForEmail', function () {

        it('should find user if everything is good', function () {
            // prepare
            dbMock.users.update = sinon.stub().callsArgWith(3, null, result);
            usersEntities.__set__('db', dbMock);
            // execute && attest
            return usersEntities.setNewPasswordForEmail(email)
                .then(function(data) {
                    expect(compareObjects(data, result)).to.equal(true);
                });
        });

        it('should not find user if something was wrong', function () {
            // prepare
            dbMock.users.update = sinon.stub().callsArgWith(3, error, null);
            usersEntities.__set__('db', dbMock);
            // execute && attest
            return usersEntities.setNewPasswordForEmail(email)
                .then(function(){})
                .catch(function(err) {
                    expect(compareObjects(err, error)).to.equal(true);
                });
        });

    });

});
