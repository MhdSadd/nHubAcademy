const router = require("express").Router()
const { ensureAuthenticated,verifyPermission,isLoggedIn,forwardAuthenticated } = require("../../config/auth")
const { create_course, profile, all_instructors, allCourseGet, delete_instructor, approve_instructor, delete_course, update_courseGet, update_coursePost, updateCourse, approved_instructors, student_control} = require("../../controllers/admin/adminController");
const upload = require('../../config/multer')


/*=======================================> 
Admin routing
<=========================================*/

// index / create-course route 
router.get("/create-course", ensureAuthenticated, create_course);

// profile route
router.get("/profile", ensureAuthenticated, profile);

//All instructor route
router.get("/all-instructors",ensureAuthenticated, all_instructors);

// delete instructor
router.get("/deleteInstructor/:instructorId", ensureAuthenticated, delete_instructor);

// approve instructor
router.get("/approveInstructor/:instructorId",ensureAuthenticated, approve_instructor);

// All approved Instructor
router.get("/approved-instructors", ensureAuthenticated, approved_instructors )

// delete course
router.get("/delete-course/:courseId", ensureAuthenticated, delete_course);

// update course page GET from a single course in all course page
router.get("/update-course/:courseId", ensureAuthenticated, update_coursePost);

// update course POST
router.post("/update/:courseId", upload.single('courseImage'), updateCourse);

// all courses GET
router.get("/all-courses",ensureAuthenticated, allCourseGet);

// all student GET
router.get("/all-student", ensureAuthenticated, student_control )

// update course page GET
// router.get("/update-course", ensureAuthenticated, update_courseGet);


// profile update POST
// router.post("/profile-update", isLoggedIn, upload.single('avatar'), profile_update)


module.exports = router;