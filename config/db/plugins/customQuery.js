const customQueryPlugin = schema => {
    schema.statics.byEmail = function (email) {
        return this.find({email: email});
    };

    schema.statics.paginate = function (page, limit) {
        const skipRes = (page * limit) - limit;
        return this.find({}).skip(skipRes).limit(limit);
    };
};

module.exports = customQueryPlugin;