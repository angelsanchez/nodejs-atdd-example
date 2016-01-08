'use strict';

const config = require('../../src/config.js');

module.exports = function () {
    this.Before(done => {
        this.world = {};
        cleanDB(done);
    });

    this.After(cleanDB);
};

function cleanDB(done) {
    const connect = require('../../src/storage/connect');
    connect()
        .then(db => db.collections())
        .then(collections => {
            Promise.all(collections.map(collection => collection.remove()))
        })
        .then(done)
        .catch(done);
}
