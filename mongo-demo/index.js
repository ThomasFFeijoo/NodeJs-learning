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
   const course = await Course.findByIdAndUpdate( id , {
        $set: {
            author: 'Thomassss',
            isPublished: false
        }
    }, {new: true});
    console.log(course);
}

async function removeCourse(id) {
    // deleteMany if want to delete more than 1
    //const result = await Course.deleteOne({ _id: id });
    const course = await Course.findByIdAndRemove(id);
    console.log(course);
 }

//createCourse();
//getCourses();
//updateCourse('5bbc9710516adb108fb40475');
removeCourse('5bbc9710516adb108fb40475');