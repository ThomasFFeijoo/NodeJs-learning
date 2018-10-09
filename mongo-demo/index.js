const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.error('could not connect', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

// create the object that will be added to the db, like the model object in zend 3
async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Thomas',
        tags: [ 'angular', 'frontend'],
        isPublished: true
    });

    const result = await course.save(); // returns a Promise
    console.log(result);
}
async function getCourses() {
    const courses = await Course
        //.find({ author: 'Thomas', isPublished: true })
        // Starts with Thom
        //.find({ author: /^Thom/ }) // ^ = begins with

        // Ends with mas
        //.find({ author: /mas$/i }) // $ = ends with, i = case insensitive
        
        // Contains homa
        .find({ author: /.*homa.*/i }) // .* .* = contains
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });

    console.log(courses);
}

//createCourse();
getCourses();