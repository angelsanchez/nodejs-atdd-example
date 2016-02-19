'use strict';

const config = require('../../../src/config');
const httpServices = require('../../../src/http_services');
const connect = require('../../../src/storage/connect');

const cleanDB = done => {
  connect().then(db => db.dropDatabase(done)).catch(done);
};

module.exports = function() {

  this.BeforeFeatures((event, done) => {
    httpServices
      .start(config.app.port)
      .then(done)
      .catch(err => done(err));
  });

  this.Before(done => {
    this.world = {};
    cleanDB(done);
  });

  this.After(cleanDB);
};
