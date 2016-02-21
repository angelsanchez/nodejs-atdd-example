'use strict';

const HTTP = require('http-status-codes');
const mockery = require('mockery');
const expect = require('../dirty-chai').expect;
const sinon = require('sinon');

const authorList = [
  {name: 'Isaac Asimov'},
  {name: 'Frank Herbert'}
];

const getFindAuthorsEndpointInstance = findAuthorsStub => {
  mockery.registerMock('./find_all', findAuthorsStub);

  mockery.enable({
    useCleanCache: true,
    warnOnReplace: false,
    warnOnUnregistered: false
  });

  return require('../../../src/authors/find_endpoint');
};

describe('Endpoint: List of authors', () => {

  afterEach(() => {
    mockery.deregisterAll();
    mockery.disable();
  });

  it('Should retrieve a list of authors and status code = 200 OK', done => {
    const findAuthorsStub = () => Promise.resolve(authorList);
    const findAuthorsEndpoint = getFindAuthorsEndpointInstance(findAuthorsStub);

    const requestStub = {};
    const res = {};
    const responseStub = {
      json: bodyContent => {
        res.statusCode = HTTP.OK;
        res.body = bodyContent;
      }
    };

    findAuthorsEndpoint(requestStub, responseStub, () => {
      expect(res.statusCode).to.equal(HTTP.OK);
      expect(res.body.authors).to.deep.equal(authorList);
      done();
    });
  });

  it('Should log an error on find failure and response with  code = 500 INTERNAL_SERVER_ERROR', done => {
    const errorStub = new Error('Something went wrong');
    const findAuthorsStub = () => Promise.reject(errorStub);
    const findAuthorsEndpoint = getFindAuthorsEndpointInstance(findAuthorsStub);

    const requestStub = {
      body: {}
    };
    const responseStub = {
      json: sinon.spy()
    };

    findAuthorsEndpoint(requestStub, responseStub, err => {
      expect(err).to.deep.equal(errorStub);
      expect(responseStub.json.calledWith(HTTP.INTERNAL_SERVER_ERROR, {error: errorStub})).to.ok();
      done();
    });
  });


});
