'use strict';
/* eslint-disable no-process-env */

const fs = require('fs');
const configJson = fs.existsSync(`${process.cwd()}/src/config.json`) ? require('./config.json') : undefined;

require('dotenv').config();

module.exports = {
  app: {
    name: process.env.APP_NAME || configJson.app.name,
    host: process.env.APP_HOST || configJson.app.host,
    port: process.env.APP_PORT || configJson.app.port
  },
  database: {
    uri: process.env.DB_URI || configJson.database.uri,
    connectOptions: {}
  }
};
