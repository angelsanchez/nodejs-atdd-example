'use strict';

const MongoClient = require('mongodb').MongoClient;

const baseConfig = require('../config');
const logErrorAndReject = require('../util/log_error_and_reject');
const logAndResolve = require('../util/log_and_resolve');

module.exports = newConfig => {
  const config = newConfig || baseConfig;
  return MongoClient
    .connect(config.database.uri, config.database.connectOptions)
    .then(logAndResolve(`Connected to db => ${config.database.uri}`))
    .catch(logErrorAndReject('Unable to connect to db'));
};
