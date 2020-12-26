const router = require('express').Router()

const { index, about, contact, course_details,
instructor_details,
web_development, mobile_development,DS_development,Graphics,AR_VR,Robotics,
reigisterGet} = require("../../controllers/default/defaultController")

// home route
router.get("/", index);

// about route
router.get("/about", about);

// contact route
router.get("/contact", contact);

// course-details route
router.get("/course-details", course_details);

// Register route
router.route('/register')
.get(reigisterGet)

// instructor-details
router.get("/instructor-details/:instructorID", instructor_details);

// web-development route
router.get("/web-development", web_development);

// Mobile-development
router.get("/mobile", mobile_development);

// Data science & Machine learning
router.get("/data-science", DS_development);

// Graphics
router.get("/graphics", Graphics);

// Robotics & AI
router.get("/robotics",Robotics);

// AR/VR
router.get("/ar-vr",AR_VR);


// courses route 
// router.get("/course", course);

// education route 
// router.get("/education", education);



module.exports = router;