const ObjectID = require('mongodb').ObjectID;
const Colleges = require("../models/colleges");

const getColleges = async (req, res, next) => {
    try {
        const { 
            name = undefined, 
            id = undefined, 
            getSimilar = false
        } = req.query;

        let responseData = {};
        if(getSimilar === "true"){
            if(!id) {
                const err = new Error("Provide id query parameter");
                err.status = 404;

                throw err;
            }

            const college = await Colleges.findById(new ObjectID(id));
            
            if(!college) {
                const err = new Error("College with given ID cannot be found");
                err.statusCode = 404;
                throw err;
            }

            const { 
                state,
                courses,
                studentCount
            } = college;

            const similarColleges = await Colleges.find({ 
                $or: [
                    { state: state },
                    { courses: { $in: [ ...courses ]  } }
                ]
            });

            responseData = {
                similarColleges: { ...similarColleges }
            }

        } else {
            if(name) {
                // return college with name as "name"
                const college = await (await Colleges.findOne({ name: name })).toOject();
                responseData = {
                    college: { ...college }
                };
            } else if (id) {
                // return college with _id as "id"
                const college = await (await Colleges.findById(new ObjectID(id))).toObject();
                responseData = {
                    college: { ...college }
                };
            } else {
                // return all colleges
                const colleges = await Colleges.find({});
                responseData = {
                    colleges: { ...colleges }
                };
            }
        }

        res.status(200).json(responseData);

    } catch(err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    }
}

module.exports = {
    getColleges
}