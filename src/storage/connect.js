'use strict';

const config = require('../config');
const MongoClient = require('mongodb').MongoClient;
const logger = require('../logger');

const connectionEstablished = new Promise((resolve, reject) => {
  MongoClient.connect(config.database.uri, (error, db) => {
    if (error) {
      logger.error('Unable to connect to db: ', error);
      reject(error);
    } else {
      logger.info(`Connected to db => ${config.database.uri}`);
      resolve(db);
    }
  });
});

module.exports = () => connectionEstablished;
