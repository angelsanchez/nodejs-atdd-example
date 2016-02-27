'use strict';

const expect = require('../../dirty_chai').expect;
const validateAuthor = require('../../../src/authors/validate_author');
const testData = require('./test_data');

const validAuthor = testData.validAuthor;

const invalidAuthor = {
  died: '06-04-1992'
};

describe('Schema validation', () => {

  it('pass with a valid author', done => {
    validateAuthor(validAuthor).then(res => {
      expect(res).to.deep.equal(validAuthor);
      return done();
    }).catch(done);
  });

  it('fail with a invalid author', done => {
    validateAuthor(invalidAuthor)
      .then(() => done(new Error('This test should fail')))
      .catch(err => {
        expect(err).to.not.be.undefined();
        expect(err).to.have.property('code').that.is.a('string');
        expect(err.code).to.equal('validation_error');
        expect(err).to.have.property('errors')
          .that.is.an('array')
          .that.deep.equals([
          {message: 'Missing required property: name'},
          {message: 'Missing required property: born'}
        ]);
        return done();
      });
  });

});
