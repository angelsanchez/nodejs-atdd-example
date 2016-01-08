'use strict';

const assert = require('assert');

module.exports = function() {
    this.Then(/^the last response code is (\d+)$/, (expectedResponseCode, done) => {
        const world = this.world;
        assert.equal(world.lastResponseStatusCode, Number(expectedResponseCode));
        done();
    });
};
