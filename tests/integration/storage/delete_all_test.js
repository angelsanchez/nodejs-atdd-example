'use strict';

const deleteAll = require('../../../src/storage/delete_all');
const findAll = require('../../../src/storage/find_many');
const mongodb = require('mongodb');
const sinon = require('sinon');
require('sinon-as-promised');
const Logger = require('bunyan');
const expect = require('../../dirty_chai').expect;

const dropTestCollection = require('./test_helpers').dropTestCollection;
const insertSome = require('./test_helpers').insertSome;

const doc1 = { x: 1, _id: 'doc1' };
const doc2 = { x: 2, _id: 'doc2' };

describe('Storage delete integration tests', () => {

  beforeEach(dropTestCollection);
  beforeEach(done => insertSome(done, [doc1, doc2]));

  afterEach(dropTestCollection);

  it('Should delete all items in a collection', done => {

    deleteAll('test').then(() => {

      return findAll('test')
        .then(cursor => cursor.toArray())
        .then(result => {
        expect(result).to.be.an('array').with.length.of(0);
        return done();
      });

    }).catch(done);
  });

  it('Logs error on failure', done => {

    const errorStub = new Error('Can\'t delete this document');
    const findStub = sinon.stub(mongodb.Collection.prototype, 'deleteMany').rejects(errorStub);

    const logErrorSpy = sinon.spy(Logger.prototype, 'error');

    deleteAll('test')
      .then(() => done(new Error('This test should fail')))
      .catch(err => {
        expect(err).to.exist();
        expect(err).to.deep.equal(errorStub);
        expect(logErrorSpy.called).to.be.ok();
        findStub.restore();
        logErrorSpy.restore();
        return done();

      });
  });

});
