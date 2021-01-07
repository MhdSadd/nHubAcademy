const mongoose = require("mongoose");
const { Admin } = require("../../models/admin/admin");
const { Instructor } = require("../../models/instructor/instructor");
const { Course } = require("../../models/courses/course");
const cloudinary = require("../../config/cloudinary");
const {Student} = require("../../models/students/student")  
const bcrypt = require("bcryptjs");
const format = require("date-fns")
const moment = require("moment");
const api_key = process.env.MAILGUN_API_KEY
const domain = process.env.DOMAIN
const mailgun = require('mailgun-js')({apiKey: api_key, domain:domain})
const mailer = require('../../misc/mailer')


module.exports = {

  // create course/admin
  create_course: async (req, res) => {
    const instructor = Instructor.find({instructorApproved: true});
    instructor.exec((err, instructor) => {
      if (err) throw err;
      else {
        const pagetitle = "Admin";
        const name = req.user.name;
        const email = req.user.email;
        const avatar = req.user.avatar
        const author = req.user.name
        const categories=  ['Front End','Back End','Mobile App Development','Full Stack Development','Robotics','Data Science','Machine Learning','Artificial Intelligence', 'Graphics', 'Ar/Vr']
        res.render("admin/create-course", { pagetitle, name, email, avatar, author, instructor, categories });
      }
  })
  },

  // admin profile get
  profile: async (req, res) => {
    const pagetitle = "Profile";
    const name = req.user.name;
    const email = req.user.email;
    const avatar = req.user.avatar
    const phone = req.user.phone
    res.render("admin/profile", { pagetitle, name, email, avatar, phone });
  },

  // all instructor GET
  all_instructors: (req, res) => {
    const instructors = Instructor.find({instructorApproved: false});
    instructors.exec((err, instructors) => {
      if (err) throw err;
      else {
        let pagetitle = "Instructors";
        const name = req.user.name;
        const email = req.user.email;
        const avatar = req.user.avatar
        res.render("admin/all-instructor", { pagetitle, instructors, name, email, avatar  });
      }
    });
  },

  // delete an instructor
  delete_instructor: async (req, res) => {
    const id = req.params.instructorId;
    await Instructor.findByIdAndDelete(id)
      .then((deleteInstructor) => {
        console.log(deleteInstructor);
        res.redirect("/admin/all-instructors");
        return;
      })
      .catch((err) => console.log(err));
  },

  // approving of instructors
  approve_instructor: (req, res) => {
    let _id = req.params.instructorId;
    console.log(_id);
    Instructor.findOne({ _id })
      .then(async(approveInstructor) => {
        approveInstructor.instructorApproved = true;
        let data = {
          from:mailer.GMAIL_USER,
          to:approveInstructor.email,
          subject:"Application Approval",
          text:"your nAcademy instructorship application has been approved you'll now be able to be assigned students"
        }
      await mailgun.messages().send(data, (err, body)=>{
          // console.log(body)
          // flash goes here
        })
        // console.log(approveInstructor);
        approveInstructor.save();
        res.redirect("/admin/all-instructors");
      })
      .catch((err) => console.log(err));
  },

  // approved instructorPage GET
  approved_instructors: (req, res) => {
    Instructor.find({ instructorApproved: true }).then((approved) => {
      let pagetitle = "Instructors";
      const name = req.user.name;
      const email = req.user.email;
      const avatar = req.user.avatar
      res.render("admin/approved-instructor", { pagetitle, approved, name, email, avatar });
    });
  },

  // all course
  allCourseGet: (req, res) => {
    const course = Course.find({}).populate("instructor", ["name", "email"])
    course.exec((err, courses) => {
      if (err) throw err;
      else {
        console.log(courses);
        let pagetitle = "All courses";
        const name = req.user.name;
        const email = req.user.email;
        const avatar = req.user.avatar
        res.render("admin/all-course", { pagetitle, courses, name, email, avatar });
      }
    });
  },

  // update page GET
  update_courseGet: async (req, res) => {
    const pagetitle = "Update Course";
    const update = req.user.update;
    const name = req.user.name;
    const email = req.user.email;
    const avatar = req.user.avatar
    res.render("admin/update-course", { pagetitle, update, name, email, avatar});
  },

   // delete a course
   delete_course: async (req, res) => {
    const id = req.params.courseId;
    await Course.findByIdAndDelete(id)
      .then((deleteCourse) => {
        res.redirect("/admin/all-courses");
        return;
      })
      .catch((err) => console.log(err));
  },

  // finding course and render for editing
  update_coursePost: async (req, res) => {
    const id = req.params.courseId;
    await Course.findById(id).populate("instructor", ["name", "email"]).then((update) => {
    const instructor = Instructor.find({instructorApproved: true})
    instructor.exec((err, instructor) => {
    if (err) throw err;
    else {
    // console.log('updateeeeeeeee',update);
    const pagetitle = "Update Course";
    const name = req.user.name;
    const email = req.user.email;
    const avatar = req.user.avatar
    res.render("admin/update-course", { pagetitle, update,instructor, name, email, avatar });
      }
    })
    });
  },

  // updating course
  updateCourse: async (req, res, next) => {
    let updates = req.body;
    let _id = req.params.courseId;
    // console.log("consoling body:::::", req.body, req.file);
    console.log(_id);
    await Course.findByIdAndUpdate({ _id }, updates)
      .then((updatedCourse) => {
        // console.log("updated course:::", updatedCourse)
        updatedCourse.save();
        res.redirect("/admin/all-courses");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  student_control: async(req, res)=>{
   const students = Student.find({}).populate("courses", ['courseName', 'duration'])
   students.exec((err, students)=>{

     if(err) throw err
     else{
       if (!students) return;
      //  const newStudentsList = students.map(item => (
      //    item.courses
      //  ))
      let studentss
      let recentCourse;
      const newStudentsList = students.forEach(student=>{
        studentss = student.courses    
        console.log(studentss)
       
      })
      //  console.log('===================>',lastCourse);
      //  const last = students[0].courses.length-1
      //  const lastOf = students[0].courses[last]

      const pagetitle = "Student Control";
      const name = req.user.name;
      const email = req.user.email;
      const avatar = req.user.avatar;
      const date = moment(students.dateRegistered).format('dd.MM.yyyy') 
      res.render("admin/student-control", {pagetitle, students, name, email, avatar, date})
     }
   })
  },



  single_studentGet: async(req,res)=>{
    const id = req.params.studentId; 
    // console.log('look==========>>', id)
    await Student.findById(id).populate("courses", ["courseName", "instructor"])
      .then((singleStudent) => {
        console.log("==========>>", singleStudent)
        const pagetitle = "single student";
        const name = req.user.name;
        const email = req.user.email;
        const phone = req.user.phone;
        const avatar = req.user.avatar
        res.render("admin/single-student", { pagetitle, singleStudent, name, avatar});        
      })
      .catch((err) => console.log(err));
  }
  

  // profile update
//   profile_update: async(req, res, next)=>{
//     const id = req.user.id;
//     console.log(id)
//     let updateProfiles = req.body
//     console.log(updateProfiles)
//     await Admin.findByIdAndUpdate(id,updateProfiles)
//     .then(async(updatedAdmin) => {
//         if(!updatedAdmin) {
//             console.log("Cannot update Admin Details");
//             req.flash("error_msg", "Cannot update");
//         } else {

//           // uploading avatar to cloudinary
//           await cloudinary.v2.uploader.upload(req.file.path, async(err, result)=>{
//             updatedAdmin.avatar = result.secure_url
//           })
//           updatedAdmin.avatar = "/assets/images/avatarProfilePic"
          
//           await updatedAdmin.save();
//           res.redirect("/admin/profile");
//           console.log('Update was successfull:::::', updateProfiles);
//           req.flash("success_msg", "Your update was Successful");
         
//         }
//     })
//     .catch((err) => {
//         console.log("An error occured while updating", err);
//         req.flash("error_msg", "Your Update couldn't be processed");
//         res.redirect("/admin/profile");
//     })
// }
};
