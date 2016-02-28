'use strict';

const config = require('../../../src/config');
const connect = require('../../../src/storage/connect');
const expect = require('../../dirty_chai').expect;

describe('Storage connect integration tests', () => {

  it('Should connect to mongodb', done => {
    connect().then(db => {
      expect(db).to.exist();
      return done();
    }).catch(done);
  });

  it('Should fail to connect with an invalid db config', done => {

    const testConf = Object.assign({}, config, {
      database: { uri: 'mongodb://unknown_host:999999/random_db' }
    });
    connect(testConf).then(() => done(new Error('This test should fail'))).catch(err => {
      expect(err).to.exist();
      expect(err).to.have.property('message');
      expect(err.message).to.equal('invalid port (larger than 65535) with hostname');
      return done();
    });
  });



});
