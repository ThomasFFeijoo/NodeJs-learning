const express = require('express');
const router = express.Router(); // because is a router, the common declaration doesn't work

const courses= [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

// when arrive in this file, the base path is /api/courses/
//get all courses
router.get('/', (req, res) => {
    res.send(courses);
});

//get params
router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found');
    res.send(course);
});

//post
router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found');

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});


function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(course, schema);
}

module.exports = router;