'use strict';

const request = require('request-promise');

module.exports = {
  get: url => {
    return request.get({
        uri: url,
        json: true,
        resolveWithFullResponse: true
      })
      .then(res => ({
        statusCode: res.statusCode,
        body: res.body
      }));
  },
  post: (url, body) => {
    return request.post({
        uri: url,
        json: body,
        resolveWithFullResponse: true
      })
      .then(res => ({
        statusCode: res.statusCode,
        body: res.body
      }));
  }
};
