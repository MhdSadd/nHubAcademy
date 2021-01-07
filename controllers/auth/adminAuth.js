// this is going to be the admins passport
const passport = require("passport");


module.exports = {
    adminLoginGet: (req, res) => {
        const pageTitle = "Login";
        res.render("auth/login", {pageTitle});
    },

    adminLoginPost: (req, res, next) => {
    passport.authenticate('admin', {
        successRedirect: "/admin/profile",
        failureRedirect: "/auth/login",
        failureFlash: true,
    })(req, res, next);
    },
    
    
    // LOGOUT HANDLER 
    logout: (req, res) => {
        req.logOut();
        req.flash({message:"You are logged out"});
        res.redirect("/auth/login");
    },
}