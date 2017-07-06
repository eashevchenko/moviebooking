const Joi = require('joi');

module.exports = {
    validateQuery: (schema, arrNames) => {
        return (req, res, next) => {
            let validateObj = {};

            for(let name of arrNames) {
                validateObj[name] = req['query'][name];
            }

            const result = Joi.validate(validateObj, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            } else {
                next();
            }
        }
    },

    validateParams: (schema, arrNames) => {
        return (req, res, next) => {
            let validateObj = {};

            for(let name of arrNames) {
                validateObj[name] = req['params'][name];
            }

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
        paginateSchema: Joi.object().keys({
            page: Joi.number(),
            size: Joi.number(),
            sort: Joi.string().valid('asc', 'desc')
        }),
        queryDateSchema: Joi.object().keys({
            from: Joi.date().required(),
            to: Joi.date()
        }),
        timestampSchema: Joi.object().keys({
            timestamp: Joi.date().timestamp().required()
        }),
        movieSchema: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            director: Joi.string().required(),
            timeDuration: Joi.number().integer().min(1)
        }),
        cinemaSchema: Joi.object().keys({
            title: Joi.string().required(),
            address: Joi.string().required()
        }),
        hallSchema: Joi.object().keys({
            title: Joi.string().required(),
            places: Joi.number().integer().min(1).required()
        }),
        userSchema: Joi.object().keys({
            firstName: Joi.string(),
            lastName: Joi.string(),
            phoneNumber: Joi.string(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }),
        authSchema: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })
    }
};