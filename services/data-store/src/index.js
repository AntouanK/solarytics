'use strict';

const express             = require('express');
const morgan              = require('morgan');
const compression         = require('compression');
const cors                = require('cors');
const parse               = require('./routes/parse');
const dayList             = require('./routes/day-list');
const dayGet              = require('./routes/day-get');
const lastUpdate          = require('./routes/last-update');
const whPerDate           = require('./routes/wh-per-date');
const app                 = express();
const PORT                = 80;



app.use( morgan('dev') );
app.use( cors() );
app.use( compression() );

app.post('/api/parse',    parse);

app.get('/api/day-list',  dayList);
app.get('/api/day/:date', dayGet);
app.get('/api/wh/per/date/:startdate/:enddate', whPerDate);
app.get('/api/last-update', lastUpdate);


app.listen(PORT);
console.log(`app listening on ${PORT}...`);
