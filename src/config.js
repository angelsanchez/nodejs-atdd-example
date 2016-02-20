'use strict';
/* eslint-disable no-process-env */

const configJson = require('./config.json');

require('dotenv').config();

module.exports = Object.assign({}, configJson, {
  app: {
    name: process.env.APP_NAME || configJson.app.name,
    host: process.env.APP_HOST || configJson.app.host,
    port: process.env.APP_PORT || configJson.app.port
  },
  database: {
    uri: process.env.DB_URI || configJson.database.uri,
    connectOptions: {}
  }
});
