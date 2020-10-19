var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require("../middleware");
//====================
//  Campground Routes
//====================

// Index Route - show all campgrounds
router.get("/", (req, res)=>{
	Campground.find({}, (err, allCampgrounds)=>{
		if(err){
			console.log(err);
		} else{
			res.render("campgrounds/index", {campgrounds: allCampgrounds, page: 'campgrounds'});
		}
	})
});

// Create - create campgrounds
router.post("/",middleware.isLoggedIn, (req, res)=>{
	var name = req.body.name;
	var image = req.body.image;
	var cost = req.body.cost;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newcampground = {name: name, image: image, cost: cost, description: desc, author: author};
	Campground.create(newcampground , (err, newlyCreated)=>{
		if (err){
			req.flash("error", "Something went wrong");
		} else {
			res.redirect("/campgrounds");
		}
	});
});

// New - show form to create campgrounds
router.get("/new",middleware.isLoggedIn, (req, res)=>{
	res.render("campgrounds/new");
});

// Show - show more info about one route
router.get("/:id", (req, res)=>{
	Campground.findById(req.params.id).populate("comments").exec((err, foundCampground)=>{
		if(err || !foundCampground){
			req.flash("error", "Campground not found");
			res.redirect("back");
		}else{
			res.render("campgrounds/show", {campgrounds:foundCampground });
		}
	});
});

//Edit - show edit form
router.get("/:id/edit",middleware.checkOwnerShip, (req,res)=>{
	Campground.findById(req.params.id, (err, foundCampground)=>{
		if (err){
			res.redirect("/campgrounds");
		}else{
			res.render("campgrounds/edit", {campgrounds: foundCampground});
		}
	});
});

//Update - update the campgrounds and show it
router.put("/:id",middleware.checkOwnerShip, (req, res)=>{
	Campground.findByIdAndUpdate(req.params.id, req.body.campgrounds, (err, updatedCampground)=>{
		if(err){
			res.redirect("/campgrounds");
		}else{
			req.flash("success", "Updated Successfully !!")
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// Destroy the campgrounds
router.delete("/:id",middleware.checkOwnerShip, (req, res)=>{
	Campground.findByIdAndRemove(req.params.id, (err)=>{
		if (err){
			res.redirect("/campgrounds");
		}else{
			res.redirect("/campgrounds")
		}
	});
});

module.exports = router;