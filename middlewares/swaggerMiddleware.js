const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');

module.exports = {
    init: (app) => {
        app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
};
