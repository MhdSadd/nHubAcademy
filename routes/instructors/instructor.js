const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isLoggedIn } = require("../../config/auth");

const { index, profile, update_profileGet, update_profile, update_availability, assigned_student } = require("../../controllers/instructors/instructorsControllers");
const upload = require('../../config/multer')




// index route
router.get("/", ensureAuthenticated, index);


// profilePage route
router.get("/profile",ensureAuthenticated ,profile);


// profileUpdate routes
router.route("/update-profile")
.get(ensureAuthenticated,update_profileGet)
.post(isLoggedIn, upload.single('instructorAvatar'),update_profile)

// update availability
router.post("/update-availability", update_availability );

// assigned students
router.get("/assigned-students", ensureAuthenticated, assigned_student)

// basic-table route
// router.get("/update-profile", update-profile);

// Blank-page route
// router.get("/blank-page", ensureAuthenticated, isLoggedIn, blank_pagers);


module.exports = router;