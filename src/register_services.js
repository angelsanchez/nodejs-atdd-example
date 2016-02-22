'use strict';

const logRequest = require('./middleware/log_request');
const logResponse = require('./middleware/log_response');

const routesList = [
  require('./authors/routes')
];

module.exports = server => {

  server.use(logRequest);

  routesList.forEach(addRoutes => addRoutes(server));

  server.on('after', logResponse);

};

