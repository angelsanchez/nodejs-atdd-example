'use strict';

const connect = require('../../../src/storage/connect');

module.exports = () => connect()
  .then(db => {
      return db.listCollections({name: 'test'}).toArray().then(found => {
        const col = found[0];
        if (!col) {
          return Promise.resolve();
        }

        return db.dropCollection(col.name).then(() => null);
      });
  });
