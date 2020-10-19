var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment')

var data = [
	{
		name: "Forest Gum",
		image:"https://i.pinimg.com/originals/e7/d4/6b/e7d46b54d422e17ee698085bc91da43e.jpg",
		description:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful"
	}, 
	{
		name: "Delight treek ",
		image:"https://s2.narvii.com/image/wtnjttkj4axq4qdrmx5m5fbbpcgdp3jy_00.jpg",
		description:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handfulr"
	}, 
	{
		name: "Sun Breaker",
		image:"https://cdn.bulbagarden.net/upload/thumb/2/27/Summer_Camp.png/1200px-Summer_Camp.png",
		description:"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful"
	}
];

function seedDB(){
	//remove campground
	Campground.remove({}, (err)=>{
	// 	if (err){
	// 		console.log(err);
	// 	}
	// 	console.log("Removed Campgrounds");
	// 	//add campground
	// 	data.forEach(function(seed){
	// 		Campground.create(seed, (err, campground)=>{
	// 			if (err)
	// 				console.log(err);
	// 			else {
	// 				console.log("added Campground");
	// 				//add comments
	// 				Comment.create(
	// 					{
	// 						text: "This is the greatest camp ever", 
	// 						author:"Danish"
	// 					}, (err, comment)=>{
	// 						if (err)
	// 							console.log(err);
	// 						else{
	// 							campground.comments.push(comment);
	// 							campground.save();
	// 							console.log("Created new comment");
	// 						}
	// 					});
					
	// 			}
	// 		});
	// 	});
	});		 
};

module.exports = seedDB;