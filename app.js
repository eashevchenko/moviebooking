'use strict';

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();
require('./config/db');
require('./middlewares')(app);
require('./routes')(app);

app.listen(PORT,() => {
    console.log('server started.. Port: ', PORT);
});
