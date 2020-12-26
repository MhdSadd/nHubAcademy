const express = require("express");
const router = express.Router();
const {CoursePost, allCourseGet, singleCourseGet, sign_upCourse} = require('../../controllers/courses/coursesController');
const upload = require('../../config/multer');
const {ensureAuthenticated} = require('../../config/auth');





// Add course
router.route('/add-course')
.post(upload.single('courseImage'), CoursePost)

// Packages route
router.get('/package', allCourseGet);
router.get("/single-package/:courseId", singleCourseGet);
router.post("/sign-up/:courseId", sign_upCourse);











module.exports =router
