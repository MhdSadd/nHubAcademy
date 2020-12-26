const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isLoggedIn } = require("../../config/auth");

const { index, profile, update_profileGet, update_profile } = require("../../controllers/instructors/instructorsControllers");
const upload = require('../../config/multer')




// index route
router.get("/", ensureAuthenticated, isLoggedIn, index);


// profilePage route
router.get("/profile", profile);


// profileUpdate routes
router.route("/update-profile")
.get(update_profileGet)
.post(isLoggedIn, upload.single('instructorAvatar'),update_profile)

// basic-table route
// router.get("/update-profile", update-profile);

// Blank-page route
// router.get("/blank-page", ensureAuthenticated, isLoggedIn, blank_pagers);

// put route
router.route("/update-profile")
.get(update_profileGet)
.post(isLoggedIn, upload.single('instructorAvatar'),update_profile)


module.exports = router;