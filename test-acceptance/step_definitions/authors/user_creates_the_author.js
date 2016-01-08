'use strict';

const clientAPI = require('../../client_app/client_api');

module.exports = function() {
    this.When(/^user creates the author$/, done => {
        const world = this.world;

        clientAPI
            .createAuthor(world.author)
            .then(res => {
                world.lastResponseStatusCode = res.statusCode;
                world.lastResponseBody = res.body;
                done();
            })
            .catch(done.fail);
    });
};
