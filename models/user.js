var mongoose = require('mongoose');
var passportLocalmongoose = require('passport-local-mongoose');

var userSchema= new mongoose.Schema({
	username:String,
	password:String,
	isAdmin: {type: Boolean, default:false}
});

userSchema.plugin(passportLocalmongoose);

module.exports = mongoose.model("User", userSchema);
