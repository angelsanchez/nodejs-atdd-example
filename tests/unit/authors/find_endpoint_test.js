'use strict';

const HTTP = require('http-status-codes');
const mockery = require('mockery');
const expect = require('chai').expect;

const authorList = [
  {name: 'Isaac Asimov'},
  {name: 'Frank Herbert'}
];

function getFindAuthorsEndpointInstance(findAuthorsStub) {
  mockery.registerMock('./find', findAuthorsStub);

  mockery.enable({
    useCleanCache: true,
    warnOnReplace: false,
    warnOnUnregistered: false
  });

  return require('../../../src/authors/find_endpoint');
}

describe('Endpoint: List of authors', () => {

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

});
