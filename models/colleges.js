const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Name
 * Year founded
 * City
 * State
 * Country
 * No of students
 * Courses  (Computer science, Electronics, IT..etc)
 */

const collegeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    yearFounded: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String, 
        required: true
    },
    studentCount: {
        type: Number,
        required: true,
    },
    courses: [String]
});

module.exports = mongoose.model("Colleges", collegeSchema);