const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
    .then(() => console.log('connected to MongoDB'))
    .catch(err => console.error('could not connect', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses() {
    /*
    return await Course
        .find({ isPublished: true, tags: 'backend' })
        .sort({ name:1 })
        .select({ name: 1, author: 1 });
        */
       /*
    return await Course
        .find({ isPublished: true, tags: { $in: ['frontend', 'backend'] } })
        .sort({ price: -1 })
        .select({ name: 1, author: 1 , price: 1});
        */
    return await Course
        .find({ isPublished: true })
        .or([{ price: { $gte: 15 }}, { name: /.*by.*/ }] );
}

async function run(){
    const courses = await getCourses();
    console.log(courses);
}

run();