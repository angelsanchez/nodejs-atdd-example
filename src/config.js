'use strict';
/* eslint-disable no-process-env */

const fs = require('fs');
const configJson = fs.existsSync(`${process.cwd()}/src/config.json`) ? require('./config.json') : undefined;

const CONNECTION_POOL_SIZE = 20;

module.exports = {
  app: {
    name: process.env.APP_NAME || configJson.app.name,
    host: process.env.APP_HOST || configJson.app.host,
    port: process.env.APP_PORT || configJson.app.port
  },
  database: {
    uri: process.env.DB_URI || configJson.database.uri,
    connectOptions: {
      server: {
        poolSize: CONNECTION_POOL_SIZE
      }
    }
  }
};
