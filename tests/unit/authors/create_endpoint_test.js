'use strict';

const HTTP = require('http-status-codes');
const mockery = require('mockery');
const expect = require('chai').expect;

function getCreateAuthorEndpointInstance(createAuthorsStub) {
  mockery.registerMock('./create', createAuthorsStub);

  mockery.enable({
    useCleanCache: true,
    warnOnReplace: false,
    warnOnUnregistered: false
  });

  return require('../../../src/authors/create_endpoint');
}

describe('Endpoint: Create an author', () => {

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

});
