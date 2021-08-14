const express = require('express');
const router = express.Router();

const collegeControllers = require('../controllers/colleges');

/** 
 * route: GET /colleges
 * queryParams: {
 *      name: {
 *          type: String,
 *          -- if provided return college data with its name as "name"  
 *      },
 *      id: {
 *          type: String,
 *          -- if provided along with fetchSimilar params to true then return colleges similar to college with _id as "id"
 *              else return the college data with its _id as "id" -- 
 *      },
 *      getSimilar: {
 *          values: true or false
 *          -- dependent on id query param --
 *      }
 * }
 *  
*/
router.get('/', collegeControllers.getColleges);

module.exports = router;
