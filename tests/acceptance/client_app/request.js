'use strict';

const request = require('request');

module.exports = {
  get: url => {
    return new Promise((resolve, reject) => {
      const options = {
        uri: url,
        method: 'GET',
        json: true
      };

      request(options,
        (err, res, body) => {
          if (err) {
            reject(err);
          }
          else {
            resolve({statusCode: res.statusCode, body });
          }
        }
      );
    });
  },
  post: (url, body) => {
    return new Promise((resolve, reject) => {
      const options = {
        uri: url,
        method: 'POST',
        json: body
      };

      request(options,
        (err, res, responseBody) => {
          if (err) {
            reject(err);
          }
          else {
            resolve({statusCode: res.statusCode, body: responseBody});
          }
        }
      );
    });
  }
};
