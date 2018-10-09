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
    // comparison operators
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)
    
    //returns everything
    //const courses = await Course.find();
    
    const courses = await Course
        //.find({ author: 'Thomas', isPublished: true })
        //.find({ price: { $gt: 10, $lte: 20 } }) // greater than 10 and less than or equal to 20
        .find({ price: { $in: [10, 15, 20] } }) //price needs to be 10,15 or 20
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });

    console.log(courses);
}

//createCourse();
getCourses();