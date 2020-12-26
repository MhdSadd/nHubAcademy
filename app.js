const dotenv = require("dotenv");
dotenv.config();


const express = require("express");
const cookieParser = require('cookie-parser')
const methodOverride = require("method-override");
const app = express();
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash = require("connect-flash");
const passport = require("passport");
require("./config/passport")(passport);
const {globalVariable} = require("./config/configurations");
const mongoose = require("mongoose");
const MONGO_URI = require('./config/dev').MONGO_URI
const environment = process.env.NODE_ENV || 'development';


// connect DB
   // DATABASE CONNECTION
mongoose.connect(MONGO_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then((res) => {
    console.log(`Database Connected at MongoURI...`)
})
.catch((err) => {
    console.log(`Database connection failed ${err}`)
})

// morgan init
app.use(logger('production'))
app.use(cookieParser())
app.use(methodOverride('_method'))


// Connecting to static files
app.use(express.static(path.join(__dirname,'public')));

// setting up template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Configure Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));



// SET UP EXPRESS_SESSION MIDDLEWARE
app.use(
    session({
        secret: `${process.env.NODE_SESSION}`,
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: Date.now() + 60000},
        store: new MongoStore({
            mongooseConnection: mongoose.connection,
            ttl: 600 * 6000 // = 1 hour
            })
    })
);

//initiallize passport
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

// Global variables
app.use(globalVariable) 



// routing
const defaultRoutes = require("./routes/default/default");
const auth = require("./routes/auth/auth");
const coursesRoutes = require("./routes/courses/course");
const admin = require("./routes/admin/admin");
const instructors = require("./routes/instructors/instructor");
const { ensureAuthenticated } = require("./config/auth");

// routes
app.use("/", defaultRoutes);
app.use("/auth", auth);
app.use("/courses", coursesRoutes)
app.use("/admin", admin);
app.use("/instructor", instructors);


// Error handling
// catching 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// app.use(( req, res, next) => {
//     let pagetitle = "404";
//     res.render("error_page", {pagetitle})
// })

// Decelopment error handler
// printing stack trace
if(app.get("env") === "development") {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render("error_page", {
            message: err.message,
            error: err,
            pagetitle: "Error Page"
        });
    });
}

// production error handler 
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render("error_page", {
        message: err.message,
        error: {},
        pagetitle: "Error Page"
    })
})


app.listen(process.env.PORT, process.env.HOSTNAME, () => {
    console.log(`Server on http://localhost:${process.env.PORT}`)
});