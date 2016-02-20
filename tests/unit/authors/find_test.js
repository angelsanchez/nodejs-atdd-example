'use strict';

const mockery = require('mockery');
const expect = require('chai').expect;

function getFindAuthorsInstance(storageFindStub) {
  mockery.registerMock('../storage/find', storageFindStub);

  mockery.enable({
    useCleanCache: true,
    warnOnReplace: false,
    warnOnUnregistered: false
  });

  return require('../../../src/authors/find_all');
}

describe('List of authors', () => {

  afterEach(() => {
    mockery.deregisterAll();
    mockery.disable();
  });

  const authorList = [
    {name: 'Isaac Asimov'},
    {name: 'Frank Herbert'}
  ];

  it('Should return the list of authors', done => {

    const retrieveFromStorageStub = () => {
      const retrieveCursor = {
        toArray: () => Promise.resolve(authorList)
      };
      return Promise.resolve(retrieveCursor);
    };

    const findAuthors = getFindAuthorsInstance(retrieveFromStorageStub);

    findAuthors().then(authors => {
      expect(authors).to.deep.equal(authorList);
      done();
    }).catch(err => done(err));
  });

});
