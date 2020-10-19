var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var User = require('../models/user');
var passport = require('passport');

// Root Route 
router.get("/", (req, res)=>{
	res.render("landing");
});

// ==============
// Auth Routes
// ==============

// Register Form
router.get("/register", (req, res)=>{
	res.render("register" ,{page: 'register'});
});

// Handling Register Logic
router.post("/register",(req, res)=>{
	var newUser = new User({username: req.body.username});
	if (req.body.admincode === "seceretcode123"){
		newUser.isAdmin = true;
	}
	User.register( newUser, req.body.password,(err, user)=>{
		if(err){
			 return res.render("register", {"error": err.message});
		}else{
			passport.authenticate("local")(req, res, function(){
				req.flash("success", "Signed up " + user.username);
				res.redirect("/campgrounds");
			});
		}
	});
});

// Login Form 
router.get("/login", (req, res)=>{
	res.render("login", {page: 'login'});
});

//  Handling Login Logic
router.post("/login", passport.authenticate("local",{
	successRedirect: "/campgrounds",
	failureRedirect: "/login"
}),(res, req)=>{
});

// Logout
router.get("/logout",(req, res)=>{
	req.logout();
	req.flash("success", "Logout Successfully !!")
	res.redirect("/campgrounds");
});

// middleware
function isLoggedIn(req, res, next){
	if (req.isAuthenticated())
		return next();
	res.redirect("/login");
};

module.exports = router;