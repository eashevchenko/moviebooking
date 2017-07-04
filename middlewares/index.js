const logger = require('morgan');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');

module.exports = (app) => {
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};