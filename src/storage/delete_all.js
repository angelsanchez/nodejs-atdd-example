'use strict';

const connectCollection = require('./connect_collection');
const logErrorAndReject = require('../util/log_error_and_reject');
const logAndResolve = require('../util/log_and_resolve');

module.exports = collectionName => {
  return connectCollection(collectionName)
    .then(col => col.deleteMany({}))
    .then(logAndResolve('Deleted all elements from db'))
    .catch(logErrorAndReject('Unable to deleteMany from db'));

};
