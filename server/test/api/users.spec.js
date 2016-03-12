'use strict';

var expect = require('expect.js'),
  sinon = require('sinon'),
  rewire = require('rewire'),
  //usersApi = rewire('../../api/users'),
  httpStatuses = require('../../components/http-statuses');

describe('API users', function() {

  var usersEntitiesMock, callback, error;
  beforeEach(function() {
    callback = sinon.spy();
    error = {};
  });

  describe('API users 1', function() {

    it('test 1', function(done) {
      expect(1).to.equal(1);

      done();
    });
  });

});
