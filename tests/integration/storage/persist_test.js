'use strict';

const save = require('../../../src/storage/save');
const connect = require('../../../src/storage/connect');
const chai = require('chai');
const expect = require('chai').expect;

const dirtyChai = require('dirty-chai');

chai.use(dirtyChai);

function dropTestCollection(done) {
  connect()
    .then(db => {
      db.listCollections().toArray((err, replies) => {
        if (replies.some(doc => doc.name === 'test')) {
          return db.collection('test').drop(done);
        }
        return done();
      });
    })
    .catch(done);
}
describe('Storage save integration tests', () => {

  afterEach(dropTestCollection);
  beforeEach(dropTestCollection);

  it('Persist on connect to mongodb', done => {
    const someVal = 1;
    save('test', {x: someVal}).then(test => {
      expect(test._id).to.exist();
      expect(test.x).to.equal(someVal);
      done();

    }).catch(done.reject);
  });
});


