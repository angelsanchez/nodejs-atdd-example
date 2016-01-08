'use strict';

const assert = require('assert');

module.exports = function() {
    this.Then(/^the last response body contains the author data$/, done => {
        const world = this.world;
        assert.deepEqual(world.parsedAuthors[0], world.author);
        done();
    });
};
