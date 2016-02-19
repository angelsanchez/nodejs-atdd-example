'use strict';

const expect = require('chai').expect;

module.exports = function() {
  this.Then(/^the last response body contains the authors data$/, done => {
    const world = this.world;
    expect(world.lastResponseBody.authors).to.deep.equal(world.authorsToCreate);
    done();
  });
};
