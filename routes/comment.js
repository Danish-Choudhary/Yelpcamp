var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require("../models/comment");
var middleware = require("../middleware");
// ============================
//  Comments Routes
// ============================

//comments new
router.get("/new",middleware.isLoggedIn,(req, res)=>{
	Campground.findById(req.params.id, (err, campground)=>{
		if (err)
			req.flash("error", "Something went wrong");
		else{
			res.render("comments/new", {campground:campground});	
		}
	});
	
});

//create comments
router.post("/",middleware.isLoggedIn, (req, res)=>{
	Campground.findById(req.params.id, (err, campground)=>{
		if(err)
			req.flash("error", "Something went wrong");
		else{
			Comment.create(req.body.comment, (err, comment)=>{
				if (err)
					console.log(err);
				else{
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					campground.comments.push(comment);
					campground.save();
					req.flash("success", "Comment added successfully");
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

// Edit Comment 
router.get("/:comment_id/edit",middleware.checkCommentOwnerShip, (req, res)=>{
	Campground.findById(req.params.id,(err, foundCampground)=>{
		if (err || !foundCampground){
			req.flash("error", "Campground not found");
			return res.redirect("back");
		}
		Comment.findById(req.params.comment_id,(err,foundComment)=>{
			if(err){
				res.redirect("back");
			}else{
				res.render("comments/edit",{comment:foundComment, campground_id:req.params.id});
			}
		});
	}); 
});

//Update comment
router.put("/:comment_id",middleware.checkCommentOwnerShip,(req, res)=>{
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment)=>{
		if(err){
			res.redirect("back");
		}else{
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

// Destroy comment
router.delete("/:comment_id",middleware.checkCommentOwnerShip,(req, res)=>{
	Comment.findByIdAndRemove(req.params.comment_id, (err)=>{
		if(err)
			res.redirect("back");
		else
			req.flash("success", "Comment deleted successfully");
			res.redirect("/campgrounds/" + req.params.id);
	});
});

module.exports = router;