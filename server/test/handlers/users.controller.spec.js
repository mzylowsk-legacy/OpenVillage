'use strict';

var expect = require('expect.js'),
  sinon = require('sinon'),
  rewire = require('rewire');
  //usersHandler = require('../../handlers/users');

describe('HANDLER users', function() {

  var resMock, reqMock;
  beforeEach(function () {
    reqMock = {
      body: {}
    };
    resMock = {
      send: sinon.spy(),
      status: sinon.stub().returns({
        send: sinon.spy()
      })
    };
  });

  describe('handler 1 test', function () {

    it('test 1 for funtion 1', function (done) {
      //prepare
      expect(1).to.equal(1);

      done();
    });
  });

});
