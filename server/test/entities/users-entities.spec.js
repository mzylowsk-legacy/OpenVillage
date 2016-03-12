'use strict';

var expect = require('expect.js'),
  sinon = require('sinon'),
  rewire = require('rewire');
  //usersEntities = rewire('../../entities/users-entities');

describe('ENTITIES users-entities.js', function() {

  var callback, dbMock, error, query;
  beforeEach(function() {
    callback = sinon.spy();
    dbMock = {
      users: {}
    };
    error = 'InternalServerError';
    query = {};
  });

  describe('ENTITIES tests', function() {

    it('test 1', function(done) {

      expect(1).to.equal(1);

      done();
    });

  });

});
