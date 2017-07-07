const moment = require('moment');

const customQueryPlugin = schema => {

    schema.statics.searchBy = function (searchText) {
        schema.index({'$**': 'text'});
        return this.find({$text: {$search: searchText}});
    };

    schema.statics.fullSearch = function () {
        return this;
    };

    schema.statics.search = function (searchText) {
        return this.find({$text: {$search: searchText}});
    };

    schema.statics.paginate = function (page, limit) {
        const skipRes = (page * limit) - limit;
        return this.find({}).skip(skipRes).limit(limit);
    };

    schema.statics.searchInTimes = function (start, end, time) {
      return this;
    };

};

module.exports = customQueryPlugin;