'use strict';

const connect = require('../../../src/storage/connect');
const saveOne = require('../../../src/storage/save_one');

module.exports = {
  dropTestCollection: done => connect()
  .then(db => {
      return db.listCollections({name: 'test'}).toArray().then(found => {
        const col = found[0];
        if (!col) {
          return Promise.resolve();
        }

        return db.dropCollection(col.name).then(() => null);
      });
  }).then(done).catch(done),

  insertSome: (done, docs) => Promise.all(docs.map(doc => saveOne('test', doc)))
      .then(() => null) // done() needs to resolve with null as first parameter
      .then(done).catch(done)
};
