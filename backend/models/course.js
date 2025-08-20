const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({

    course_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    }
})

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;