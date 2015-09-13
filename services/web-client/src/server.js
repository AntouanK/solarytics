'use strict';

const path                = require('path');
const express             = require('express');
const morgan              = require('morgan');
const compression         = require('compression');
const serveStatic         = require('serve-static');

const app                 = express();
const PORT                = 80;
const DIST_PATH           = path.resolve(process.cwd(), 'fe', 'dist');


app.use( morgan('dev') );
app.use( compression() );

app.use(serveStatic(DIST_PATH));

app.listen(PORT);
console.log(`app listening on ${PORT}...`);
