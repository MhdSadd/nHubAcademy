const localStrategy = require("passport-local").Strategy;
const mongooose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Instructor } = require("../models/instructor/instructor");
const { Admin } = require("../models/admin/admin");

module.exports = function (passport) {
  passport.use(
    "instructor", 
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (email, password, done) => {
        // MATCH  INSTRUCTOR
        Instructor.findOne({ email: email})
        .then((user) => {
        if (!user) {
              return done(null, false, {
                message: "No instructor with this mail"
              });
            }

            // MATCH PASSWORD
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                console.log("PPPPPPPPPPPPPPPPPPPPP", user)
                return done(null, user);
              } else {
                return done(null, false, { message: "Password incorrect" });
              }
            })
          })
          .catch((err) => console.log(err));
      }
    )
  );

  passport.use(
    "admin",
    new localStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (email, password, done) => {
        // match admin

        Admin.findOne({ email: email })
          .then((user) => {
            if (!user) {
              return done(null, false, {
                message: "This admin does not exist",
              });
            }

            // matching password
            bcrypt.compare(password, user.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, user);
              } else {
                return done(null, false, { message: "Password Incorrect" });
              }
            });
          })
          .catch((err) => console.log(err));
      }
    )
  );

  // SERIALIZE AND DESERIALIZE  INSTRUCTOR
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Admin.findById(id, (err, user) => {
      if (err) return done(err);
      if (user) return done(null, user);
      Instructor.findById(id, (err, user) => {
        done(err, user);
      });
    });
  });
};