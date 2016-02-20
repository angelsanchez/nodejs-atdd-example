'use strict';

const config = require('../../../src/config');
const httpServices = require('../../../src/server');
const connect = require('../../../src/storage/connect');

const cleanDB = done => connect().then(db => db.dropDatabase(done)).catch(done);

module.exports = function() {

  this.BeforeFeatures((event, done) => {
    httpServices
      .start(config.app.port)
      .then(done)
      .catch(done);
  });

  this.Before(() => {
    this.world = {};
  });

  this.Before(cleanDB);

  this.After(cleanDB);
};
