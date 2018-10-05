const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger');
const express = require('express');
const app = express();

app.set('view engine', 'pug');  
app.set('views', './views'); //default, optional in case want the change the default

//add middleware to process body
app.use(express.json());
app.use(express.urlencoded( { extended: true} )); // add to req.body, parse key=value&key2=value2
app.use(express.static('public')); // load files in public

app.use(helmet());

// Configs
console.log(`Application name: ${config.get('name')}`);
console.log(`Mail Server: ${config.get('mail.host')}`);
console.log(`Mail Password: ${config.get('mail.password')}`);

if(app.get('env') === 'development') {
    app.use(morgan('tiny')); // use only in development, it logs requests and their sizes
    debug('morgan enabled');
}

app.use(logger);

const courses= [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];
// How to declare a route
app.get('/', (req, res) => {
    res.render('index', { title: 'My express', message: 'Hello'});
});

//get all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

//get params
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found');
    res.send(course);
});

//post
app.post('/api/courses', (req, res) => {
    // schema for data validation, using joi
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length +1,
        name: req.body.name 
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    // look up for the course
    // 404 if not found
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found');
    
    //const result = validateCourse(req.body);
    const { error } = validateCourse(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //update course
    course.name = req.body.name;
    //return updated
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
})


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}



// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));