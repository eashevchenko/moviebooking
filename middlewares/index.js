const logger = require('morgan');

const SwaggerMiddleware = require('./swaggerMiddleware');
const HystrixMiddleware = require('./hystrixMiddleware');
const RESTMiddleware = require('./hystrixMiddleware');

module.exports = (app) => {
    if (process.env.NODE_ENV === 'development') {
        app.use(logger('dev'));
    }

    SwaggerMiddleware.init(app);
    HystrixMiddleware.init(app);
    RESTMiddleware.init(app);
};



