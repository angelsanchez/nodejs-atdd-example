'use strict';

const bunyan = require('bunyan');
const devnull = require('dev-null');

const config = require('../config');
const customSerializers = require('./custom_bunyan_serializers');

const defaultStreams = [{ stream: process.stdout }];
const testStreams = [{ stream: devnull() }];

const envConfig = {
  production: defaultStreams,
  test: testStreams
};

// eslint-disable-next-line no-process-env
const streams = envConfig[process.env.NODE_ENV] || defaultStreams;

module.exports = bunyan.createLogger({
  level: config.log.level,
  name: config.app.name,
  streams,
  serializers: customSerializers
});
