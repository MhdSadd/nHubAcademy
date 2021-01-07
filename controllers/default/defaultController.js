const mongoose = require("mongoose");
const {Course} = require("../../models/courses/course");
const {Instructor} = require("../../models/instructor/instructor")



module.exports = {
  index: async (req, res) => {
    const pagetitle = "Home";
    const user  = req.user
    // const no = courseNo;
    res.render("default/index", { pagetitle, user});

  },
  about: (req, res) => {
    const pagetitle = "About";
    const user  = req.user
    res.render("default/about", { pagetitle, user });
  },
  contact: (req, res) => {
    const pagetitle = "Contact";
    const user  = req.user
    res.render("default/contact", { pagetitle, user });
  },

  course_details: (req, res) => {
    const pagetitle = "Course Details";
    const user  = req.user
    res.render("default/course-details", { pagetitle, user });
  },

  instructor_details: async(req, res) => {
    const id = req.params.instructorID
      await Instructor.findOne({_id: id})
      .then((instructor)=>{
      console.log("loooooooo:::::",instructor)
      const pagetitle = "Instructor Details";
      const user  = req.user
      res.render("default/instructor-details", { pagetitle, instructor, user });
    })
  },

  reigisterGet: (req, res) => {
    let pageTitle = "Register";
    const user  = req.user
    res.render("auth/register", { pageTitle, user });
  },


  //All Web development GET
  web_development: async(req, res) => {
    const instructor = Instructor.find({instructorApproved: true});
    instructor.exec(async(err, instructor) => {
      if (err) throw err;
      else {
    await Course.find({$or:[{category:"Front End"}, {category:"Back End"}, {category:"Full Stack Development"}]})
    .then((webDev)=>{
      console.log(webDev)
      const pagetitle = "Web Development";
      const user  = req.user
      res.render("default/web-development", {instructor, pagetitle, webDev, user  });
    })
    }
  }
  )},

   //All DS, ML GET
    DS_development: async(req, res) => {
      const instructor = Instructor.find({instructorApproved: true});
      instructor.exec(async(err, instructor) => {
        if (err) throw err;
        else {
      await Course.find({$or:[{category:"Machine Learning"}, {category:"Data Science"}]})
      .then((dataScience)=>{
        console.log(dataScience)
        const pagetitle = "Data Science & Machine Learning";
        const user  = req.user
        res.render("default/data-science", {instructor, pagetitle, dataScience, user  });
      })
    }
  }
  )},

  
  //Mobile development
  mobile_development: (req, res) => {
    const instructor = Instructor.find({instructorApproved: true});
    instructor.exec((err, instructor) => {
      if (err) throw err;
      else {
    const mobileDev = Course.find({category:"Mobile App Development"})
    mobileDev.exec((err, mobileDev)=>{
      if(err) throw err
        else{
          console.log(mobileDev)
          const pagetitle = "Mobile Development";
          const user  = req.user
          res.render("default/mobile-development", {instructor, pagetitle, mobileDev, user});
        }
      })
    }
  }
  )},


    //Graphics
    Graphics: (req, res) => {
      const instructor = Instructor.find({instructorApproved: true});
      instructor.exec((err, instructor) => {
        if (err) throw err;
        else {
      const Graphics = Course.find({category:"Graphics"})
      Graphics.exec((err, graphics)=>{
        if(err) throw err
          else{
            console.log(graphics)
            const pagetitle = "Graphics";
            const user  = req.user
            res.render("default/graphics", {instructor, pagetitle, graphics, user});
          }
        })
      }
    }
    )},


    //Robotics & AI
    Robotics: (req, res) => {
      const instructor = Instructor.find({instructorApproved: true});
      instructor.exec((err, instructor) => {
        if (err) throw err;
        else {
      const Robotics = Course.find({$or:[{category:"Robotics"}, {category:"Artificial Intelligence"}]})
      Robotics.exec((err, robotics)=>{
        if(err) throw err
          else{
            console.log(robotics)
            const pagetitle = "Robotics & AI";
            const user  = req.user
            res.render("default/robotics", {instructor, pagetitle, robotics, user});
          }
        })
      }
    }
    )},



    //AR/VR
    AR_VR: (req, res) => {
      const instructor = Instructor.find({instructorApproved: true});
      instructor.exec((err, instructor) => {
        if (err) throw err;
        else {
      const AR_VR = Course.find({category:'Ar/Vr'})
      AR_VR.exec((err, ar_vr)=>{
        if(err) throw err
          else{
            console.log(ar_vr)
            const pagetitle = "Augmented & Visual Realities";
            const user  = req.user
            res.render("default/ar-vr", {instructor, pagetitle, ar_vr, user});
          }
        })
      }
    }
    )},

      // course: (req, res) => {
  //   const pagetitle = "Courses";
  //   res.render("default/course", { pagetitle });
  // },

    // education: (req, res) => {
  //   const pagetitle = "Education";
  //   res.render("default/education", { pagetitle });
  // },

    
};
