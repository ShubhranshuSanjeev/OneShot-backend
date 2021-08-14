const ObjectID = require('mongodb').ObjectID;
const Students = require("../models/students");

const getStudentsByCollegeID = async (req, res, next) => {
    try{
        const collegeID = req.query.collegeID;
        const students = await Students.find({ collegeID: new ObjectID(collegeID) });
        res.status(200).json({
            students
        });
    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
};

const getStudent = async (req, res, next) => {
    try{
        const studentID = req.params.id;
        const student = await (await Students.findById(new ObjectID(studentID)).populate('collegeID')).toObject();
        
        res.status(200).json({student});
    } catch(err) {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
};

module.exports = {
    getStudentsByCollegeID,
    getStudent
}