'use strict';

const saveOne = require('../../../src/storage/save_one');
const mongodb = require('mongodb');
const sinon = require('sinon');
require('sinon-as-promised');
const Logger = require('bunyan');
const expect = require('../dirty-chai').expect;

const dropTestCollection = require('./test_helpers').dropTestCollection;

const doc1 = { x: 1, _id: 'doc1' };

describe('Storage save integration tests', () => {

  beforeEach(dropTestCollection);
  afterEach(dropTestCollection);

  it('Persist on connect to mongodb', done => {
    saveOne('test', doc1).then(test => {
      expect(test._id).to.exist();
      expect(test).to.equal(doc1);
      done();

    }).catch(done);
  });

  it('Fails to run with no document', done => {

    const updateOneSpy = sinon.spy(mongodb.Collection.prototype, 'insertOne');

    saveOne('test')
      .then(() => done(new Error('This test should fail')))
      .catch(err => {
        expect(err).to.exist();
        expect(err).to.have.property('message', 'Can\'t insert an empty document');

        expect(updateOneSpy.called).to.not.be.ok();
        updateOneSpy.restore();
        return done();
      });
  });

  it('Fails on insert to collection', done => {

    const errorStub = new Error('Can\'t insert this document');
    const insertOneStub = sinon.stub(mongodb.Collection.prototype, 'insertOne').rejects(errorStub);
    const logErrorSpy = sinon.spy(Logger.prototype, 'error');

    saveOne('test', {x: 1})
      .then(() => done(new Error('This test should fail')))
      .catch(err => {
        expect(err).to.exist();
        expect(err).to.deep.equal(errorStub);
        expect(logErrorSpy.called).to.be.ok();
        insertOneStub.restore();
        logErrorSpy.restore();
        done();

      });
  });

  it('Fails on select collection to mongodb', done => {

    const errorStub = new Error('Can\'t select the collection');
    const insertOneStub = sinon.stub(mongodb.Db.prototype, 'collection').rejects(errorStub);
    const logErrorSpy = sinon.spy(Logger.prototype, 'error');

    saveOne('test', {x: 1})
      .then(() => done(new Error('This test should fail')))
      .catch(err => {
        expect(err).to.exist();
        expect(err).to.deep.equal(errorStub);
        expect(logErrorSpy.called).to.be.ok();
        insertOneStub.restore();
        logErrorSpy.restore();
        done();
      });
  });

});
