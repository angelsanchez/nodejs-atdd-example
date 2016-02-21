'use strict';

const mockery = require('mockery');
const sinon = require('sinon');
const expect = require('../dirty-chai').expect;

const getLogRequestInstance = loggerStub => {
  mockery.registerMock('../util/logger', loggerStub);

  mockery.enable({
    useCleanCache: true,
    warnOnReplace: false,
    warnOnUnregistered: false
  });

  return require('../../../src/middleware/log_request');
};

describe('Request Logger', () => {

  afterEach(() => {
    mockery.deregisterAll();
    mockery.disable();
  });

  it('Logs an incomming request', done => {

    const loggerStub = {
      info: sinon.spy(),
      error: sinon.spy()
    };
    const logRequestInstance = getLogRequestInstance(loggerStub);

    const requestStub = {};
    const res = {};
    const responseStub = {
      json: (status, bodyContent) => {
        res.statusCode = status;
        res.body = bodyContent;
      }
    };

    logRequestInstance(requestStub, responseStub, () => {
      expect(loggerStub.info.calledWith({ req: requestStub, res: responseStub })).to.be.ok();
      expect(loggerStub.error.called).to.not.be.ok();
      done();
    });
  });

});
