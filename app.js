const express = require('express');
const mongoose = require('mongoose');

const collegeRoutes = require('./routes/colleges');
const studentRoutes = require('./routes/students');

const { 
    PORT, 
    MONGO_CONNECTION_STRING 
} = require('./config');

const { 
    insertCollegeData, 
    insertStudentData
} = require('./generateData');


const app = express();
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/colleges', collegeRoutes);
app.use('/students', studentRoutes);
app.use((error, req, res, next) => {
    console.log("APP.JS: ",error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});
  
mongoose
    .connect(MONGO_CONNECTION_STRING)
    .then(async (res) => {
        console.log("MongoDB connected");
        app.listen(PORT);
        console.log(`Listening on PORT ${PORT}`);
        
        /* To insert fake data in DB */
        // await insertCollegeData();
        // await insertStudentData();
    })
    .catch(err => {
        console.log(err);
    });
