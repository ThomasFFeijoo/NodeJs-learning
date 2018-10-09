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
    const pageNumber = 2;
    const pageSize = 10;
    // /api/courses?pageNumber=2&pageSize=10

    const courses = await Course
        .find({ author: 'Thomas', isPublished: true })
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });

    console.log(courses);
}

async function updateCourse(id) {
    // approch: query first
    // find by id
    // modify properties
    // save()
    const course = await Course.findById(id);
    if(!course) return;
    course.isPublished = true;
    course.author = 'Another Author';
    
    /* Another way to set
    course.set({
        isPublished: true,
        author: 'Another Author'
    });
    */

    const result = await course.save();
    console.log(result);

    // approach: update first
    // update directly
    // optionally: get the updated document
}

//createCourse();
//getCourses();
updateCourse('5bbc9710516adb108fb40475');