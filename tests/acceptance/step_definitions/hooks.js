'use strict';

const config = require('../../../src/config');
const httpServices = require('../../../src/server');
const connect = require('../../../src/storage/connect');

const cleanDB = () => connect().then(db => db.dropDatabase());

module.exports = function() {

  this.Before(() => {
    this.world = {};
    return httpServices
      .start(config.app.port);
  });

  this.Before(cleanDB);

  this.After(cleanDB);
};
