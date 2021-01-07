const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongooose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Instructor } = require("../models/instructor/instructor");
const { Admin } = require("../models/admin/admin");

 

module.exports = function(passport) {

  passport.use('admin', new LocalStrategy (
    {
      usernameField: "email",
      passwordField: "password"
      },

      function(email, password, done) {
      
        Admin.findOne({email:email})
        .then(user => {
           if (!user) {
            return done(null, false, { message: "User does not exist" });
           }    
        // console.log(user)
            bcrypt.compare(password, user.password, (err, isMatch)=>{
            //  if(err) {throw err}
             if(!isMatch){
              return done(null, false, { message: "Password is not valid." });
           }
              return done(null, user);
  
           })      
        });  
      }
  ))

  passport.use('instructor', new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
      },

  function(email, password, done) {
  
    Instructor.findOne({email:email})
    .then(user => {
        if (!user) {
        return done(null, false, { message: "User does not exist" });
        }    
        // console.log(user)
        bcrypt.compare(password, user.password, (err, isMatch)=>{
        //  if(err) {throw err}
          if(!isMatch){
          return done(null, false, { message: "Password is not valid." });
        }
          return done(null, user);

        })      
    });  
  }

  ))

  function SessionConstructor(userId, userGroup, details) {
    this.userId = userId;
    this.userGroup = userGroup;
    this.details = details;
  }

  passport.serializeUser(function (userObject, done) {

    // userObject could be a Model1 or a Model2... or Model3, Model4, etc.

    let userGroup = "model1";
    let userPrototype =  Object.getPrototypeOf(userObject);
    if (userPrototype === Admin.prototype) {
      userGroup = "model1";

    } else if (userPrototype === Instructor.prototype) {
      userGroup = "model2";

    }
    let sessionConstructor = new SessionConstructor(userObject.id, userGroup, '');
    done(null,sessionConstructor);

  });

  passport.deserializeUser(function (sessionConstructor, done) {
    if (sessionConstructor.userGroup == 'model1') {
      Admin.findOne({
          _id: sessionConstructor.userId

      }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.

          done(err, user);
      });

    } else if (sessionConstructor.userGroup == 'model2') {
      Instructor.findOne({
          _id: sessionConstructor.userId

      }, '-localStrategy.password', function (err, user) { // When using string syntax, prefixing a path with - will flag that path as excluded.

          done(err, user);

      });

    }

  });

}