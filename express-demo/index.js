const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home')

const express = require('express');
const app = express();

app.set('view engine', 'pug');  
app.set('views', './views'); //default, optional in case want the change the default

//add middleware to process body
app.use(express.json());
app.use(express.urlencoded( { extended: true} )); // add to req.body, parse key=value&key2=value2
app.use(express.static('public')); // load files in public
app.use(helmet());
app.use('/api/courses', courses); // declaration to use route
app.use('/', home);

// Configs
console.log(`Application name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

if(app.get('env') === 'development') {
    app.use(morgan('tiny')); // use only in development, it logs requests and their sizes
    debug('morgan enabled');
}

app.use(logger);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));