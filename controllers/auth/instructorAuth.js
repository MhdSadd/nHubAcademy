const bcrypt = require("bcryptjs");
const passport = require("passport");
const {Instructor} = require("../../models/instructor/instructor");
const randomString = require("randomstring");

module.exports = {

    logout: (req, res) => {
        req.logOut();
        req.flash({message:"You are logged out"});
        res.redirect("/auth/login")
    },

    loginGet: (req, res) => {
        const pagetitle = "Login";
        res.render("auth/login", {pagetitle});
    },

    loginPost: (req, res, next) => {
        passport.authenticate("instructor", {
            successRedirect: "/instructor/profile",
            failureRedirect: "/auth/login",
            failureFlash: true,
        })(req, res, next)
    },

    registerGet: (req, res) => {
        const pagetitle = "Register";
        res.render("auth/register", {pagetitle});
    },

    registerPost: async (req, res) => {
        const { name, email, phone, password, confirmPassword} = req.body;
        const instructorAvatar = req.file
        // console.log(req.body); 
        let errors = [];

        // CHECKING REQUIRED FIELD
        if (!name || !email || !phone || !password || !confirmPassword) {
            errors.push({ msg: "Please fill in all fields" });
        }

        // CHECKING PASSWORD MATCH
        if (password !== confirmPassword) {
            errors.push({ msg: "Passwords do not match" });
        }

        //CHECKING PASSWORD LENGHT
        if (password.length < 4) {
            errors.push({ msg: "Password must be atleast 4 Characters" });
        }

        if (errors.length > 0) {
            let pagetitle = "Register";
            res.render("auth/register", {
                errors,
                name,
                email,
                phone,
                password,
                confirmPassword,
                pagetitle
            });
        } 
        else {
            await Instructor.findOne({email: email})
            .then(async(instructor) => {
                if(instructor) {
                    // console.log("Sorry User already Exist ");
                    return res.redirect("/auth/register");
                } 
                else {
                    const Id = randomString.generate({length: 5, charset: "alphanumeric"})
                    const instructorId = `nInst-${Id}`
                    const newInstructor = await new Instructor ({
                        name,
                        email,
                        phone,
                        instructorAvatar,
                        skills:[],
                        experience:[],
                        password,
                        instructorId,
                    })

                  

                    // console.log(`New instructor created: ${newInstructor}`);

                    // HASHING PASSWORD
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newInstructor.password, salt, (err, hash) => {
                            if (err) throw err;
                        
                            // SETTING PASSWORD TO HASH
                            newInstructor.password = hash;
                            // SAVING USER
                            newInstructor
                            .save()
                            .then((instructor) => {
                                req.flash(
                                    "success_msg",
                                    "Registration succesfull, login and update your profile"
                                )
                                res.redirect("/auth/login")
                            })
                            .catch((err) => console.log(err))
                        })
                    )
                }
            })
        }
    },

}