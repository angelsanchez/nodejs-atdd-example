'use strict';

const clientAPI = require('../../client_app/client_api');

module.exports = function() {
    this.When(/^user requests all authors/, (done) => {
        const world = this.world;

        clientAPI
            .retrieveAuthors()
            .then(res => {
                world.lastResponseStatusCode = res.statusCode;
                world.lastResponseBody = res.body;
                done();
            })
            .catch(done.fail);
    });
};
