'use strict';

const express = require('express');
const app = express();
const PORT = 3001;

require('./db');
require('./middlewares')(app);
require('./routes')(app);

app.listen(PORT,() => {
    console.log('server started on port: ', PORT);
});