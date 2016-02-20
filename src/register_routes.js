'use strict';

const routesList = [
  require('./authors/routes')
];

module.exports = server => routesList.forEach(addRoutes => addRoutes(server));
