'use strict';

const express             = require('express');
const morgan              = require('morgan');
const compression         = require('compression');
const cors                = require('cors');
const parse               = require('./routes/parse');
const dayList             = require('./routes/day-list');
const dayGet              = require('./routes/day-get');
const whPerDate           = require('./routes/wh-per-date');
const app                 = express();
const PORT                = 80;



app.use( morgan('dev') );
app.use( cors() );
app.use( compression() );

app.post('/parse',    parse);

app.get('/day-list',  dayList);
app.get('/day/:date', dayGet);
app.get('/wh/per/date/:startdate/:enddate', whPerDate);


app.listen(PORT);
console.log(`app listening on ${PORT}...`);
