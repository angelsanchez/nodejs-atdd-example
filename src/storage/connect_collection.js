'use strict';

const connect = require('./connect');

module.exports = (collectionName, newConfig) => connect(newConfig).then(db => db.collection(collectionName));
