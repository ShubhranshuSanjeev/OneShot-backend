const Colleges = require("./models/colleges");
const Students = require("./models/students");

const yearStart = 1850;
const country = "India";

const states = [
    "Delhi", "Gujarat", "Karnataka",
    "Madhya Pradesh", "Maharashtra",
    "Tamil Nadu", "Uttar Pradesh"
];

const courses = [
    "Aerospace Engineering",
    "Computer Science",
    "Biochemistry",
    "Ecological Sciences",
    "Neuroscience",
    "Microbiology Biology",
    "Molecular Biophysics",
    "Chemistry",
    "Electrical Communication",
    "Electronic Systems",
    "Electrical Engineering",
    "Product Design",
    "Chemical Engineering",
    "Materials Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Mathematics",
    "Physics",
];

const skills = [ 
    "C++", 
    "C", 
    "Python", 
    "Java",
    "Django",
    "Javascript",
    "ReactJS",
    "Rust",
    "Go",
    "Docker",
    "Critical Thinking", 
    "Maths", 
    "Physics"
]

function getRandom(arr, n){
    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    
    while(n--){
        let pos = Math.floor(Math.random() * len);
        result[n] = arr[pos in taken ? taken[pos] : pos];
        taken[pos] = --len in taken ? taken[len] : len; 
    }

    return result;
}

let collegeDocuments = null;
async function insertCollegeData(){
    
    //Inserting 100 colleges
    let collegesData = [];
    for(let i = 0; i < 100; i++){
        const name = `College ${i+1}`;
        const yearFounded = Math.floor(yearStart + Math.random()*160);
        const city = `City ${Math.floor(Math.random()*80)}`;
        const state = states[Math.floor(Math.random()*states.length)];
        const studentCount = 150 + Math.floor(Math.random()*2000);
        
        const courseCount = 3 + Math.floor(Math.random()*5);
        const course = getRandom(courses, courseCount);

        collegesData.push({
            name,
            yearFounded,
            city,
            state,
            country,
            studentCount,
            courses: course
        });
    }
    try {
        const docs = await Colleges.insertMany(collegesData);
        collegeDocuments = docs;
    } catch(err) {
        console.log(err);
    }
}

async function fetchColleges() {
    try{
        const docs  = await Colleges.find({});
        collegeDocuments = docs;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function insertStudentData(){
    try{
        await fetchColleges();
        collegeDocuments.forEach(college => {
            const collegeID = college._id;

            let studentData = [];
            for(let i = 0; i < 100; i++){
                const name = `Student ${i+1}`;
                const yearOfBatch = college.yearFounded + Math.floor(Math.random()*(2020-college.yearFounded));
                
                const skillCount = 3 + Math.floor(Math.random()*3);
                const startIndex = Math.floor(Math.random()*(skills.length-skillCount));
                const skill = getRandom(skills, skillCount); // skills.slice(startIndex, startIndex+skillCount+1);

                studentData.push({
                    name,
                    yearOfBatch,
                    collegeID,
                    skills: skill,
                });
            }

            Students.insertMany(studentData, (err, docs) => {
                console.log(docs);
            });
        });
    } catch (err) {
        throw err;
    }
}

module.exports = {
    insertCollegeData,
    insertStudentData
}