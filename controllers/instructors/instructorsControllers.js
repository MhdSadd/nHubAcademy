const { Instructor } = require("../../models/instructor/instructor");
const cloudinary = require('../../config/cloudinary')
const bcrypt = require('bcryptjs');
const { Student } = require("../../models/students/student");

module.exports = {
    index: (req, res) => {
        const pagetitle = "User";
        const email = req.user.email;
        const instructorAvatar = req.user.instructorAvatar;
        const name = req.user.name;
        res.render("instructor/index", {pagetitle, email, instructorAvatar, name});
    },
    profile: (req, res) => {
        const pagetitle = "Profile";
        const name = req.user.name;
        const email = req.user.email;
        const phone = req.user.phone;
        const instructorAvatar = req.user.instructorAvatar;
        const skills = req.user.skills;
        const experience = req.user.experience;
        const specialty  = req.user.specialty
        res.render("instructor/profile", {pagetitle, email, name, phone, instructorAvatar, skills, experience, specialty});
    },


    update_profileGet: (req, res) => {
        const pagetitle = "Profile Update";
        const name = req.user.name;
        const email = req.user.email;
        const password = req.user.password;
        const phone = req.user.phone;
        const instructorAvatar = req.user.instructorAvatar;
        const skills = req.user.skills;
        const experience = req.user.experience;
        const id = req.user.id;
        res.render("instructor/update_profile", {
            pagetitle, 
            name, 
            email,
            password,
            phone,
            instructorAvatar,
            skills,
            experience,
            id
        });
    },

            // profile update
    update_profile: async(req, res, next)=>{
        const id = req.user.id;
        let { skills, name, email, phone, experience, specialty } = req.body
        console.log('lalalalalalal',req.body);
        // console.log(req.file)
        await Instructor.findByIdAndUpdate(id,req.body)
        .then(async(updatedInstructor) => {
            // console.log(updatedInstructor);
        if(!updatedInstructor) {
            // console.log("Cannot update Instructor Details");
            req.flash("error_msg", "Cannot update");
        } else {

            // uploading avatar to cloudinary
        await cloudinary.v2.uploader.upload(req.file.path, async(err, result)=>{
            if(!req.file.path || !result){
            updatedInstructor.instructorAvatar = "/assets/images/avatarProfilePic.png"
            }
            else{
            updatedInstructor.instructorAvatar = result.secure_url  
            }
        })
        await updatedInstructor.save();
        res.redirect("/instructor/profile");
        req.flash("success_msg", "Your update was Successful");
            }       
        })
        .catch((err) => {
            console.log("An error occured while updating:::", err);
            req.flash("error_msg", "Your Update couldn't be processed");
            res.redirect("/instructor/profile");
        })
    },

    update_availability: async (req,res)=>{
        // console.log(req.body);
        const {name} = req.body;
        
        // finds the instrucor via the name coming from the ajax request
        // and updates isAvailable to true but can't change it back to false
        // i tried using the not ! operator but it didn't work
        Instructor.findOneAndUpdate({name}, {isAvailable: true } )
            .then( inst => {
                console.log(inst);
                console.log('availablility update successfull');
            })
            .catch( err => console.log('availabilty aint working'));
        
    },

    assigned_student: async(req, res)=>{
        const user = req.user._id
      
        const instructorAvatar = req.user.instructorAvatar;
        const name = req.user.name;
        let pagetitle = "Assigned student"
        res.render('instructor/assign-students', {pagetitle, instructorAvatar, name, user})
    }















    // basic_table: (req, res, next) => {
    //     const pagetitle = "Basic Table";
    //     const email = req.email;
    //     res.render("instructor/basic-table", {pagetitle, email});
    //     next();
    // }, 


    // blank_page: (req, res, next) => {
    //     const pagetitle = "Blank Page";
    //     const email = req.email;
    //     res.render("instructor/blank-page", {pagetitle, email});
    //     next();
    // },
}