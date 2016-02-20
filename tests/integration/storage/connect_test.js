'use strict';

const connect = require('../../../src/storage/connect');
const expect = require('../dirty-chai').expect;

describe('Storage connect integration tests', () => {

  it('Should connect to mongodb', done => {
    connect().then(db => {
      expect(db).to.exist();
      return done();
    }).catch(done);
  });

});
