const { Course } = require("../../models/courses/course");
const { Student } = require("../../models/students/student");
const {Instructor} = require("../../models/instructor/instructor")
const cloudinary = require("../../config/cloudinary");
const api_key = process.env.MAILGUN_API_KEY
const domain = process.env.DOMAIN
const mailgun = require('mailgun-js')({apiKey: api_key, domain:domain})
const mailer = require('../../misc/mailer')


module.exports = {
  CoursePost: async (req, res) => {
    const {
      courseName,
      price,
      duration,
      instructor,
      promo,
      author,
      category,
      description,
    } = req.body;
    const courseImage = req.file;
    let errors = [];
    // console.log("body consoling::::::::::", req.body, req.file);
    if (!courseImage || !courseName || !price || !duration || !category) {
      errors.push({ msg: "All field required" });
    } else {

      await cloudinary.v2.uploader.upload(
        req.file.path,
        async (err, result) => {
          // console.log("consoling result:::::::", result);
          if(!result){
            console.log(`image upload failed`)
            // flash goes here
          }
          else{
            const newCourse = await new Course({
              courseName: courseName.toUpperCase().trim(),
              price: price.trim(),
              duration:duration.trim(),
              instructor,
              promo:promo.trim(),
              category:category.trim(),
              description:description.trim(),
              author:author.trim(),
              courseImage: await result.secure_url,
            });
            // console.log(newCourse)
            newCourse.save();
            res.redirect("/admin/all-courses");
          }
        }
      );
    }
  },

  // GET all courses for client view
  allCourseGet: (req, res) => {
    const courses = Course.find({});
    courses.exec((err, courses) => {
      if (err) throw err;
      else {
        let pagetitle = "Courses";
        res.render("default/package", { pagetitle, courses });
      }
    });
  },

  // Single course GET for client view
  singleCourseGet: async (req, res) => {
    const id = req.params.courseId; 
    // console.log('look::::::::::::::', id)
    await Course.findById(id).populate("instructor", ["name", "email"])
      .then((single) => {
        // console.log("nnnnnnnnnn", single)
        const pagetitle = "single Course";
        res.render("default/single-package", { pagetitle, single });        
      })
      .catch((err) => console.log(err));
  },


  // Student sign up course
  sign_upCourse: async (req, res, next) => {
    let _id = req.params.courseId;
    console.log(_id);
    await Course.findById({ _id })
      .then((course) => {
        let studentID = req.body;
        Student.findOne(studentID).then(async(student) => {
          student.courses.push(course)
          console.log(student)
          // Sending mail
            let data = {
              from:mailer.GMAIL_USER,
              to:student.email,
              subject:"nAcademy Course Registration",
              text:`Your nAcademy course registration for ${course.courseName} is successfull`
            }
          await mailgun.messages().send(data, (err, body)=>{
              // console.log(body)
              // flash goes here
            })
          student.save();
          req.flash({ message: "Course registration successfull" });
          res.redirect("/courses/package");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
