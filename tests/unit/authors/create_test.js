'use strict';

const mockery = require('mockery');
const expect = require('../dirty-chai').expect;
const testData = require('./test_data');

const validAuthor = testData.validAuthor;

const invalidAuthor = {
  name: 'Isaac Asimov'
};

const getCreateAuthorInstance = storageCreateStub => {
  mockery.registerMock('../storage/save_one', storageCreateStub);

  mockery.enable({
    useCleanCache: true,
    warnOnReplace: false,
    warnOnUnregistered: false
  });

  return require('../../../src/authors/create');
};

describe('Create authors', () => {

  afterEach(() => {
    mockery.deregisterAll();
    mockery.disable();
  });

  it('Should return the created author', done => {

    const createdAuthor = Object.assign({_id: '1234'}, validAuthor);

    const storageCreateStub = () => {
      return Promise.resolve(createdAuthor);
    };

    const createAuthor = getCreateAuthorInstance(storageCreateStub);

    createAuthor(validAuthor).then(author => {
      expect(author).to.deep.equal(createdAuthor);
      expect(author._id).to.exist();
      done();
    }).catch(err => done(err));
  });

  it('Should return an error because the author is invalid', done => {

    const storageCreateStub = () => Promise.resolve();

    const createAuthor = getCreateAuthorInstance(storageCreateStub);

    createAuthor(invalidAuthor)
      .then(() => done('Error: the author should be invalid'))
      .catch(err => {
        expect(err.code).to.equal('validation_error');
        expect(err.errors).to.exist();
        done();
      });
  });

});
