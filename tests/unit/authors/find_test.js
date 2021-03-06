'use strict';

const mockery = require('mockery');
const expect = require('../../dirty_chai').expect;

const getFindAuthorsInstance = storageFindStub => {
  mockery.registerMock('../storage/find_many', storageFindStub);

  mockery.enable({
    useCleanCache: true,
    warnOnReplace: false,
    warnOnUnregistered: false
  });

  return require('../../../src/authors/find_all');
};

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

    const retrieveFromStorageStub = () => Promise.resolve({
        toArray: () => Promise.resolve(authorList)
    });

    const findAuthors = getFindAuthorsInstance(retrieveFromStorageStub);

    findAuthors().then(authors => {
      expect(authors).to.deep.equal(authorList);
      return done();
    }).catch(done);
  });

});
