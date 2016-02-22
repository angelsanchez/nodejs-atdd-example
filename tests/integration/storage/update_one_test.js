'use strict';

const updateOne = require('../../../src/storage/update_one');
const findOne = require('../../../src/storage/find_one');
const mongodb = require('mongodb');
const sinon = require('sinon');
require('sinon-as-promised');
const Logger = require('bunyan');
const expect = require('../dirty-chai').expect;

const dropTestCollection = require('./test_helpers').dropTestCollection;
const insertSome = require('./test_helpers').insertSome;

const doc1 = { x: 1, _id: 'doc1' };
const doc2 = { x: 2, _id: 'doc2' };

describe('Storage update integration tests', () => {

  beforeEach(dropTestCollection);
  beforeEach(done => insertSome(done, [doc1, doc2]));

  afterEach(dropTestCollection);

  it('Should update one document in a collection', done => {

    const update = {
      $set: {
        x: 3,
        another: 4
      }
    };
    const newDoc = { _id: doc1._id, another: 4, x: 3};

    updateOne('test', doc1, update).then(() => {

      return findOne('test', { _id: doc1._id })
        .then(result => {
          expect(result).to.be.an('object').with.deep.equal(newDoc);
          done();
        });

    }).catch(done);
  });

  it('Fails to run with no update criteria', done => {

    const updateOneSpy = sinon.spy(mongodb.Collection.prototype, 'updateOne');

    updateOne('test')
      .then(() => done(new Error('This test should fail')))
      .catch(err => {
        expect(err).to.exist();
        expect(err).to.have.property('message', 'Can\'t update document without criteria or payload');

        expect(updateOneSpy.called).to.not.be.ok();
        updateOneSpy.restore();
        return done();
      });
  });

  it('Fails to run with no update payload', done => {

    const updateOneSpy = sinon.spy(mongodb.Collection.prototype, 'updateOne');

    updateOne('test', doc1)
      .then(() => done(new Error('This test should fail')))
      .catch(err => {
        expect(err).to.exist();
        expect(err).to.have.property('message', 'Can\'t update document without criteria or payload');

        expect(updateOneSpy.called).to.not.be.ok();
        updateOneSpy.restore();
        return done();
      });
  });

  it('Logs error on failure', done => {

    const errorStub = new Error('Can\'t update this document');
    const findStub = sinon.stub(mongodb.Collection.prototype, 'updateOne').rejects(errorStub);

    const logErrorSpy = sinon.spy(Logger.prototype, 'error');

    const update = { notEmpty: 1 };

    updateOne('test', doc1, update)
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
