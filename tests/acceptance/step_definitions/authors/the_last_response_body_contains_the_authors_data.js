'use strict';

const expect = require('chai').expect;

module.exports = function() {
  this.Then(/^the last response body contains the authors data$/, done => {
    const world = this.world;
    const authors = world.lastResponseBody.authors;

    authors.forEach(author => expect(world.authorsToCreate).to.include(author));
    done();
  });
};
