'use strict';

const save = require('../../../src/storage/save');
const connect = require('../../../src/storage/connect');
const expect = require('../dirty-chai').expect;

const dropTestCollection = done => connect()
  .then(db => {
    const col = db.listCollections({name: 'test'})[0];
    return col ? db.dropCollection(col).then(done) : done();
  }).catch(done);

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


