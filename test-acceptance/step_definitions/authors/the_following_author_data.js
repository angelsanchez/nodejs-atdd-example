'use strict';

module.exports = function() {
    this.When(/^the following author data$/, (authorsTable, done) => {
        let authorRow = authorsTable.hashes()[0];

        this.world.author = {
            name: authorRow.Name,
            born: new Date(authorRow.Born),
            died: new Date(authorRow.Died),
            language: authorRow.Language,
            occupation: authorRow.Occupation.split(','),
            nationality: authorRow.Nationality,
            picture: authorRow.Picture
        };

        done();
    });
};
