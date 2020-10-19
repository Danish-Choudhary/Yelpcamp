var express        = require('express'),
	app            = express(),
	bodyParser     = require('body-parser'),
	mongoose       = require('mongoose'),
	flash          = require('connect-flash'),
	passport       = require('passport'),
	LocalStrategy  = require('passport-local'),
	Campground     = require('./models/campground'),
	methodOverride = require('method-override'),
	User           = require('./models/user'),
	Comment        = require("./models/comment"),
	seedDB         = require('./seeds');

var indexRoutes      = require('./routes/index'),
	campgroundRoutes = require('./routes/campground'),
	commentRoutes    = require('./routes/comment');
// const dbUrl= process.env.DB_URL;
mongoose.connect("mongodb://localhost:27017/yelp_camp_v11", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set ("view engine", "ejs");

// seedDB();

app.locals.moment = require('moment');

// Passport Configration

app.use(require('express-session')({
	secret: "Danish is the only best",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/",indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(3000, function(){
	console.log("The server has started");
});