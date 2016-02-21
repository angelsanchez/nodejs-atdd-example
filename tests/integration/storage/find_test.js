'use strict';

const save = require('../../../src/storage/save');
const find = require('../../../src/storage/find');
const mongodb = require('mongodb');
const sinon = require('sinon');
require('sinon-as-promised');
const Logger = require('bunyan');
const expect = require('../dirty-chai').expect;

const dropTestCollection = require('./drop_test_collection');

const doc1 = {
  x: 1,
  _id: 'doc1'
};
const doc2 = {
  x: 2,
  _id: 'doc2'
};

describe('Storage find integration tests', () => {

  beforeEach(done => {
    return dropTestCollection().then(() => {
      return Promise.all([
        save('test', doc1),
        save('test', doc2)
      ]).then(() => done()).catch(done);
    });
  });
  afterEach(done => dropTestCollection().then(done).catch(done));

  it('Finds all document with no criteria', done => {

    find('test').then(found => {

      return found.toArray().then(res => {
        expect(res).to.exist();
        expect(res).to.be.an('array').with.length.of(2);
        expect(res[0]).to.deep.equal(doc1);
        expect(res[1]).to.deep.equal(doc2);
        return done();

      }).catch(done);
    });
  });

  it('Finds no document with wrong criteria', done => {

    find('test', { x: 3 }).then(found => {

      return found.toArray().then(res => {
        expect(res).to.exist();
        expect(res).to.be.an('array').with.length.of(0);
        return done();

      }).catch(done);
    });

  });

  it('Logs error on failure', done => {

    const errorStub = new Error('Can\'t search this document');
    const findStub = sinon.stub(mongodb.Collection.prototype, 'find').rejects(errorStub);

    const logErrorSpy = sinon.spy(Logger.prototype, 'error');

    find('test', doc1)
      .then(() => done(new Error('This test should fail')))
      .catch(err => {
        expect(err).to.exist();
        expect(err).to.deep.equal(errorStub);
        expect(logErrorSpy.called).to.be.ok();
        findStub.restore();
        logErrorSpy.restore();
        done();

      });
  });


});
