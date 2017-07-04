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

    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);

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
        }),
        queryDateSchema: Joi.object().keys({
            from: Joi.date().required(),
            to: Joi.date()
        }),
        timestampSchema: Joi.object().keys({
            timestamp: Joi.date().timestamp().required()
        }),
        movieSchema: Joi.object().keys({
            title: Joi.string().required()
        }),
        cinemaSchema: Joi.object().keys({
            title: Joi.string().required(),
            address: Joi.string().required()
        }),
        hallSchema: Joi.object().keys({
            title: Joi.string().required(),
            places: Joi.number().integer().min(1).required()
        }),
    }
};