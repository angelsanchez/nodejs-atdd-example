'use strict';

const save = require('../../../src/storage/save');
const mongodb = require('mongodb');
const sinon = require('sinon');
require('sinon-as-promised');
const Logger = require('bunyan');
const expect = require('../dirty-chai').expect;

const dropTestCollection = require('./drop_test_collection');

describe('Storage save integration tests', () => {

  beforeEach(done => dropTestCollection().then(done).catch(done));
  afterEach(done => dropTestCollection().then(done).catch(done));

  it('Persist on connect to mongodb', done => {
    const someVal = 1;
    save('test', {x: someVal}).then(test => {
      expect(test._id).to.exist();
      expect(test.x).to.equal(someVal);
      done();

    }).catch(done.reject);
  });

  it('Fails on save to mongodb', done => {

    const errorStub = new Error('Can\'t insert this document');
    const insertOneStub = sinon.stub(mongodb.Collection.prototype, 'insertOne').rejects(errorStub);
    const logErrorSpy = sinon.spy(Logger.prototype, 'error');

    save('test', {x: 1})
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
