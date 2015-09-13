'use strict';

const express             = require('express');
const morgan              = require('morgan');
const compression         = require('compression');
const cors                = require('cors');
const parse               = require('./routes/parse');
const dayList             = require('./routes/day-list');
const dayGet              = require('./routes/day-get');
const app                 = express();
const PORT                = 80;



app.use( morgan('dev') );
app.use( cors({ origin: 'http://solarytics' }) );
app.use( compression() );

app.post('/parse',    parse);

app.get('/day-list',  dayList);
app.get('/day/:date', dayGet);

app.listen(PORT);
console.log(`app listening on ${PORT}...`);
