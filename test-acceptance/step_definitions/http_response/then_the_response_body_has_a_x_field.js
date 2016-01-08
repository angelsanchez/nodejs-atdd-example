'use strict';

const assert = require('assert');

module.exports = function () {
    this.Then(/^the response body has (an|a) "([^"]*)" field$/, (anOrA, expectedFieldName, done) => {
        const world = this.world;
        assert.ok(world.lastResponseBody.hasOwnProperty(expectedFieldName));
        done();
    });
};
