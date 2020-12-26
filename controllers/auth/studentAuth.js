const mongoose  = require('mongoose')
const bcrypt = require("bcryptjs");
const randomString = require('randomstring')
const {Student} = require('../../models/students/student');
const api_key = process.env.MAILGUN_API_KEY
const domain = process.env.DOMAIN
const mailgun = require('mailgun-js')({apiKey: api_key, domain:domain})
const mailer = require('../../misc/mailer')

module.exports = {
  studentRegisterGet: (req, res) => {
    const pagetitle = "Register";
    res.render("auth/register", {pagetitle});
  },
  studentRegisterPost : (req, res, err) => {
    const { name, email, password, confirmPassword, phone, courses } = req.body;
    // console.log(req.body)
    let errors = [];
  
    // CHECKING REQUIRED FIELD
    if (!name || !email || !password || !confirmPassword || !phone) {
      errors.push({ msg: "Please fill in all fields" });
    }
  
    // CHECKING PASSWORD MATCH
    if (password !== confirmPassword) {
      errors.push({ msg: "Passwords do not match" });
    }
  
    //CHECKING PASSWORD LENGHT
    if (password.length < 4) {
      errors.push({ msg: "Password must be atleast 6 Characters" });
    }
  
    if (errors.length > 0) {
      let pagetitle = "Register"
      res.render("auth/register", {
        errors,
        name,
        email,
        phone,
        password,
        confirmPassword,
        pagetitle
      });
    } else {
      //  VALIDATION PASS
      Student.findOne({ email: email }).then((user) => {
        if (user) {
          //  USER EXIST
          errors.push({ msg: "Email is already registered" });
          let pagetitle = "Register"
          res.render("auth/register", {
            errors,
            name,
            email,
            phone,
            password,
            confirmPassword,
            pagetitle
          });
        } else {
            const studentID = `nAcad-${ randomString.generate({
                length: 5,
                charset: 'alphanumeric'
            })}`
          // CREATING A NEW USER INSTANCE
          const newStudent = new Student({
            name,
            email,
            phone,
            password,
            courses,
            studentID
          });
  
          // HASHING PASSWORD
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newStudent.password, salt, (err, hash) => {
              if (err) throw err;
  
              // SETTING PASSWORD TO HASH
              newStudent.password = hash;
              // SAVING USER
              newStudent
                .save()
                .then(async(student) => {
                  let data = {
                    from:mailer.GMAIL_USER,
                    to:student.email,
                    subject:"nAcademy Registration",
                    text:`Your nAcademy student registration is successfull, here is your student Id ${student.studentID}
                    keep it safely as this is going to be your means of identification for signing up for courses`
                  }
                await mailgun.messages().send(data, (err, body)=>{
                    console.log(body)
                    // flash goes here
                  })
                  req.flash(
                    "success_msg",
                    "Registration succesfull"
                  );
                  res.redirect("/courses/package");
                })
                .catch((err) => console.log(err));
            })
          );
        }
      });
    }
  }
  
  
}

