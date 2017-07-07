const hidden = schema => {
    schema.set('toJSON', {
        versionKey: false,
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete  ret._id;
        }
    });

    schema.set('toObject', {
        versionKey: false,
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete  ret._id;
        }
    });

};

module.exports = hidden;