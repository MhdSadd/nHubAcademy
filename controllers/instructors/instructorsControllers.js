const { Instructor } = require("../../models/instructor/instructor");
const cloudinary = require('../../config/cloudinary')
const bcrypt = require('bcryptjs')

module.exports = {
    index: (req, res, next) => {
        const pagetitle = "User";
        const email = req.user.email;
        const instructorAvatar = req.user.instructorAvatar;
        const name = req.user.name;
        res.render("instructor/index", {pagetitle, email, instructorAvatar, name});
        next();
    },
    profile: (req, res, next) => {
        const pagetitle = "Profile";
        const name = req.user.name;
        const email = req.user.email;
        const phone = req.user.phone;
        const instructorAvatar = req.user.instructorAvatar;
        const skills = req.user.skills;
        const experience = req.user.experience;
        const specialty  = req.user.specialty
        res.render("instructor/profile", {pagetitle, email, name, phone, instructorAvatar, skills, experience, specialty});
        next();
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
        skills = skills.split(',')
        console.log('lalalalalalal',req.body);
        // console.log(req.file)
        await Instructor.findByIdAndUpdate(id,req.body)
        .then(async(updatedInstructor) => {
            // console.log(updatedInstructor);
        if(!updatedInstructor) {
            ``// console.log("Cannot update Instructor Details");
            req.flash("error_msg", "Cannot update");
        } else {

            // uploading avatar to cloudinary
        // await cloudinary.v2.uploader.upload(req.file.path, async(err, result)=>{
        //     if(!req.file.path || !result){
        //     updatedInstructor.instructorAvatar = "/assets/images/avatarProfilePic.png"
        //     }
        //     else{
        //     updatedInstructor.instructorAvatar = result.secure_url  
        //     }
        // })
        // await updatedInstructor.save();
        // res.redirect("/instructor/profile");
        // req.flash("success_msg", "Your update was Successful");
            }       
        })
        .catch((err) => {
            console.log("An error occured while updating:::", err);
            req.flash("error_msg", "Your Update couldn't be processed");
            res.redirect("/instructor/profile");
        })
    },

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