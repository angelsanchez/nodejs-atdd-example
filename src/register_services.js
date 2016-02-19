'use strict';

const modules = [
  require('./authors/routes')
];

module.exports = server => {
  modules.forEach(module => {
    module(server);
  });
};
