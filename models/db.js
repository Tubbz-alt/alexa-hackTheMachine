"use-strict";

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hack-the-machine',()=>{
	console.log('mongodb connected to hack-the-machine database');
})

module.exports = mongoose;


