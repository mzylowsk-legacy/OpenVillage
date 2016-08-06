'use strict';

var expect = require('expect.js'),
    sinon = require('sinon'),
    rewire = require('rewire'),
    tokenEntities = rewire('../../entities/token-entities');

describe('ENTITIES token-entities.js', function () {

    var dbMock, error, result;
    var username, token, type;
    beforeEach(function () {
        dbMock = {
            bind: sinon.spy(),
            tokens: {}
        };
        result = 'result';
        error = 'InternalServerError';
        username = 'username';
        type = 'type';
        token = 'token';
    });

    var compareObjects = function(objA, objB) {
        return JSON.stringify(objA) === JSON.stringify(objB);
    };

    describe('addToken', function () {

        it('should add user if everything is good', function () {
            // prepare
            dbMock.tokens.insert = sinon.stub().callsArgWith(1, null, result);
            tokenEntities.__set__('db', dbMock);
            // execute && attest
            return tokenEntities.addToken(username, token, type)
                .then(function(data) {
                    expect(compareObjects(data, result)).to.equal(true);
                });
        });

        it('should not add user if something was wrong', function () {
            // prepare
            dbMock.tokens.insert = sinon.stub().callsArgWith(1, error, null);
            tokenEntities.__set__('db', dbMock);
            // execute && attest
            return tokenEntities.addToken(username, token, type)
                .then(function(){})
                .catch(function(err) {
                    expect(compareObjects(err, error)).to.equal(true);
                });
        });

    });

    describe('findTokenByUsernameAndType', function () {

        it('should find user if everything is good', function () {
            // prepare
            dbMock.tokens.findOne = sinon.stub().callsArgWith(1, null, result);
            tokenEntities.__set__('db', dbMock);
            // execute && attest
            return tokenEntities.findTokenByUsernameAndType(username, type)
                .then(function(data) {
                    expect(compareObjects(data, result)).to.equal(true);
                });
        });

        it('should not find user if something was wrong', function () {
            // prepare
            dbMock.tokens.findOne = sinon.stub().callsArgWith(1, error, null);
            tokenEntities.__set__('db', dbMock);
            // execute && attest
            return tokenEntities.findTokenByUsernameAndType(username, type)
                .then(function(){})
                .catch(function(err) {
                    expect(compareObjects(err, error)).to.equal(true);
                });
        });

    });

    describe('deleteByUsernameAndType', function () {

        it('should find user if everything is good', function () {
            // prepare
            dbMock.tokens.remove = sinon.stub().callsArgWith(1, null, result);
            tokenEntities.__set__('db', dbMock);
            // execute && attest
            return tokenEntities.deleteByUsernameAndType(username, type)
                .then(function(data) {
                    expect(compareObjects(data, result)).to.equal(true);
                });
        });

        it('should not find user if something was wrong', function () {
            // prepare
            dbMock.tokens.remove = sinon.stub().callsArgWith(1, error, null);
            tokenEntities.__set__('db', dbMock);
            // execute && attest
            return tokenEntities.deleteByUsernameAndType(username, type)
                .then(function(){})
                .catch(function(err) {
                    expect(compareObjects(err, error)).to.equal(true);
                });
        });

    });

});
