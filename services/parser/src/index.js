'use strict';

const express             = require('express');
const morgan              = require('morgan');
const parse               = require('./routes/parse');
const dayList             = require('./routes/day-list');
const app                 = express();
const PORT                = 80;



app.use( morgan('dev') );

app.post('/parse',    parse);

app.get('/day-list', dayList);

app.listen(PORT);
console.log(`app listening on ${PORT}...`);
