'use strict';

const connectCollection = require('./connect_collection');
const logErrorAndReject = require('../util/log_error_and_reject');

module.exports = (collectionName, customCriteria) => {
  const criteria = customCriteria || {};

  return connectCollection(collectionName)
    .then(col => col.find(criteria))
    .catch(logErrorAndReject('Unable to retrieve from db, error'));
};
