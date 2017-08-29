const logger = require('morgan');
const bodyParser = require('body-parser');

const {environment} = require('../config');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');

const hystrixDashboard = require('hystrix-dashboard');
const toobusy = require('express-hystrix-toobusy');

const appDashboard = require('appmetrics-dash');

// if circuit breaker is open - response 503 http status code
const hystrixConfig = {
    fallback: (err, req, res) => {
        if (err.message === 'TooBusy') {
            res.status(503).end();
            return;
        }
        res.status(500).end();
    },
    commandResolver: req => {
        switch (req.path) {
            case '/halls':
                return 'hallsCommand';
            default:
                return 'other';
        }
    },
    latencyThreshold: 70,
    interval: 500,
    default: {
        circuitBreakerErrorThresholdPercentage: 50,
        circuitBreakerRequestVolumeThreshold: 20,
        circuitBreakerSleepWindowInMilliseconds: 5000
    },
    commands: {
        hallsCommand: {
            circuitBreakerErrorThresholdPercentage: 50
        }
    }
};

module.exports = (app) => {
    if (environment === 'development') {
        app.use(logger('dev'));
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Netfix Hystrix metrics and circuit breaker
    // for more info about this pattern
    // @see https://martinfowler.com/bliki/CircuitBreaker.html
    // for stress test can be usefull JMeter application
    // for view metrics charts just add url: http://serverIP:serverPort/hystrixMetricsEndpoint/hystrix.stream
    app.use('/api/metrics', hystrixDashboard({
        idleTimeout: 500,
        interval: 500,
        proxy: true
    }));

    // use before routes for aggregating metrics info
    app.use(toobusy(hystrixConfig))

    // monitoring state of application for example event loop latency, heap size etc.
    appDashboard.monitor({
        url: '/api/appmetrics',
        port: 3001
    });
};



