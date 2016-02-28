'use strict';

const HTTP = require('http-status-codes');
const mockery = require('mockery');
const expect = require('../../dirty_chai').expect;
const sinon = require('sinon');

const getCreateAuthorEndpointInstance = createAuthorsStub => {
  mockery.registerMock('./create', createAuthorsStub);

  mockery.enable({
    useCleanCache: true,
    warnOnReplace: false,
    warnOnUnregistered: false
  });

  return require('../../../src/authors/create_endpoint');
};

describe('Endpoint: Create an author', () => {

  afterEach(() => {
    mockery.deregisterAll();
    mockery.disable();
  });

  it('Should create an author and return the id and status code = 201 CREATED', done => {
    const createAuthorStub = () => Promise.resolve({_id: 'author1234', name: 'Matilde Asensi'});
    const createAuthorEndpoint = getCreateAuthorEndpointInstance(createAuthorStub);

    const requestStub = {};
    const res = {};
    const responseStub = {
      json: (status, bodyContent) => {
        res.statusCode = status;
        res.body = bodyContent;
      }
    };

    createAuthorEndpoint(requestStub, responseStub, () => {
      expect(res.statusCode).to.equal(HTTP.CREATED);
      expect(res.body.id).to.exist();
      done();
    });
  });

  it('Should log an error on creation failure and response with  code = 500 INTERNAL_SERVER_ERROR', done => {
    const errorStub = new Error('Something went wrong');
    const createAuthorStub = () => Promise.reject(errorStub);
    const createAuthorEndpoint = getCreateAuthorEndpointInstance(createAuthorStub);

    const requestStub = {
      body: {}
    };
    const responseStub = {
      json: sinon.spy()
    };

    createAuthorEndpoint(requestStub, responseStub, err => {
      expect(err).to.deep.equal(errorStub);
      expect(responseStub.json.calledWith(HTTP.INTERNAL_SERVER_ERROR, {error: errorStub})).to.ok();
      done();
    });
  });

});
