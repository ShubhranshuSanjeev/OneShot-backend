const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Name
 * Year of batch
 * College_Id
 * Skills (C++, Java, C,...etc)
 */

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    yearOfBatch: {
        type: Number,
        required: true
    },
    collegeID: {
        type: Schema.Types.ObjectId,
        ref: "Colleges",
        requried: true
    },
    skills: [String]
});

module.exports = mongoose.model("Students", studentSchema);