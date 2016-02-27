'use strict';

const findOne = require('../../../src/storage/find_one');
const mongodb = require('mongodb');
const sinon = require('sinon');
require('sinon-as-promised');
const Logger = require('bunyan');
const expect = require('../../dirty_chai').expect;

const dropTestCollection = require('./test_helpers').dropTestCollection;
const insertSome = require('./test_helpers').insertSome;

const doc1 = { x: 1, _id: 'doc1' };
const doc2 = { x: 2, _id: 'doc2' };

describe('Storage find integration tests', () => {

  beforeEach(dropTestCollection);
  beforeEach(done => insertSome(done, [doc1, doc2]));

  afterEach(dropTestCollection);


  it('Finds only one document with id criteria', done => {

    findOne('test', { _id: 'doc1' })
      .then(res => {
        expect(res).to.deep.equal(doc1);
        return done();

      }).catch(done);
  });

  it('Finds no document with wrong criteria', done => {

    findOne('test', { x: 3 })
      .then(res => {
        expect(res).to.be.null();
        return done();

      }).catch(done);
  });

  it('Fails to search with no criteria', done => {

    const findOneSpy = sinon.stub(mongodb.Collection.prototype, 'find');

    findOne('test')
      .then(() => done(new Error('This test should fail')))
      .catch(err => {
        expect(err).to.exist(2);
        expect(err).to.have.property('message', 'Can\'t find one document without criteria');

        findOneSpy.restore();
        return done();
    });
  });

  it('Logs error on failure', done => {

    const errorStub = new Error('Can\'t search this document');
    const findStub = sinon.stub(mongodb.Collection.prototype, 'find').rejects(errorStub);
    const logErrorSpy = sinon.spy(Logger.prototype, 'error');

    findOne('test', doc1)
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
