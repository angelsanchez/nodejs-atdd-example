'use strict';

const mockery = require('mockery');
const sinon = require('sinon');
const expect = require('../dirty-chai').expect;

const getLogResponseInstance = loggerStub => {
  mockery.registerMock('../util/logger', loggerStub);

  mockery.enable({
    useCleanCache: true,
    warnOnReplace: false,
    warnOnUnregistered: false
  });

  return require('../../../src/middleware/log_response');
};

describe('Response Logger', () => {

  afterEach(() => {
    mockery.deregisterAll();
    mockery.disable();
  });

  // req, res, route, err
  it('Logs an outgoing response without error', () => {

    const loggerStub = {
      info: sinon.spy(),
      error: sinon.spy()
    };
    const logResponseInstance = getLogResponseInstance(loggerStub);

    const requestStub = {};
    const res = {};
    const responseStub = {
      json: (status, bodyContent) => {
        res.statusCode = status;
        res.body = bodyContent;
      }
    };
    const routeStub = {};

    logResponseInstance(requestStub, responseStub, routeStub);
    expect(loggerStub.info.called).to.be.ok();
    expect(loggerStub.info.calledWith({ res: responseStub })).to.be.ok();

    expect(loggerStub.error.called).to.not.be.ok();
  });

  // req, res, route, err
  it('Logs an outgoing response with error', () => {

    const loggerStub = {
      info: sinon.spy(),
      error: sinon.spy()
    };
    const logResponseInstance = getLogResponseInstance(loggerStub);

    const requestStub = {};
    const res = {};
    const responseStub = {
      json: (status, bodyContent) => {
        res.statusCode = status;
        res.body = bodyContent;
      }
    };
    const routeStub = {};
    const errorStub = new Error('Something went wrong');

    logResponseInstance(requestStub, responseStub, routeStub, errorStub);
    expect(loggerStub.info.called).to.not.be.ok();
    expect(loggerStub.error.calledWith({ req: requestStub, res: responseStub, err: errorStub })).to.be.ok();
  });


});
