const router = require("express").Router()
const { loginGet, loginPost, registerGet, registerPost, logout, Instructor_updateGet, Instructor_updatePost } = require("../../controllers/auth/instructorAuth");
const {adminLoginGet, adminLoginPost} = require("../../controllers/auth/adminAuth");
const { studentRegisterPost, studentRegisterGet } = require("../../controllers/auth/studentAuth");

// Login route
router.route("/login")
.get(loginGet)
.post(loginPost);

// Register Route
router.route("/register")
.get(registerGet)
.post(registerPost);

// student register
router.route("/student")
.get(studentRegisterGet)
.post(studentRegisterPost);

// update route
// router.route("/update")
// .get(Instructor_updateGet)
// .put(Instructor_updatePost)

// admin Login
router.route("/admin")
.get(adminLoginGet)
.post(adminLoginPost);


// logout handle
router.get("/logout", logout);

module.exports = router;
