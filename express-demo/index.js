const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const express = require('express');
const app = express();

if(app.get('env') === 'development') {
    app.use(morgan('tiny')); // use only in development, it logs requests and their sizes
    startupDebugger('Morgan Enabled...');
}

// Db work..
dbDebugger('connected to the db');

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));