module.exports = {
    globalVariable: (req, res, next) => {
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        res.locals.error = req.flash("error");
        // res.locals.session = req.session;
        // res.locals.instructor = req.instructor ? true : false;
        res.locals.user = req.user ? true : false;
        // res.locals.login = isAuthenticated();

    
        next();
    }, 
 
}