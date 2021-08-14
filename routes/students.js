const express = require('express');
const router = express.Router();

const studentControllers = require('../controllers/students');

router.get('/', studentControllers.getStudentsByCollegeID);
router.get('/:id', studentControllers.getStudent);

module.exports = router;
