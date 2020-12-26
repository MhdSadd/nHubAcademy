const mongoose = require("mongoose");
const {Course} = require("../../models/courses/course");
const {Instructor} = require("../../models/instructor/instructor")



module.exports = {
  index: async (req, res) => {
    const pagetitle = "Home";
    // const no = courseNo;
    res.render("default/index", { pagetitle});

  },
  about: (req, res) => {
    const pagetitle = "About";
    res.render("default/about", { pagetitle });
  },
  contact: (req, res) => {
    const pagetitle = "Contact";
    res.render("default/contact", { pagetitle });
  },

  course_details: (req, res) => {
    const pagetitle = "Course Details";
    res.render("default/course-details", { pagetitle });
  },

  instructor_details: async(req, res) => {
    const id = req.params.instructorID
      await Instructor.findOne({_id: id})
      .then((instructor)=>{
      console.log("loooooooo:::::",instructor)
      const pagetitle = "Instructor Details";
      res.render("default/instructor-details", { pagetitle, instructor });
    })
  },

  reigisterGet: (req, res) => {
    let pageTitle = "Register";
    res.render("auth/register", { pageTitle });
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
      res.render("default/web-development", {instructor, pagetitle, webDev  });
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
        res.render("default/data-science", {instructor, pagetitle, dataScience  });
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
          res.render("default/mobile-development", {instructor, pagetitle, mobileDev});
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
            res.render("default/graphics", {instructor, pagetitle, graphics});
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
            res.render("default/robotics", {instructor, pagetitle, robotics});
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
            res.render("default/ar-vr", {instructor, pagetitle, ar_vr});
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
