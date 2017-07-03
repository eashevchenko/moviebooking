const Joi = require('joi');

module.exports = {
    validate: (schema, name) => {
        return (req, res, next) => {
            let validateObj = {};
            validateObj[name] = req['params'][name];

            const result = Joi.validate(validateObj, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            } else {
                next();
            }
        }
    },

    schema: {
        idSchema: Joi.object().keys({
            id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }
};