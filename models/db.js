"use-strict";

let mongoose = require('mongoose');
mongoose.promise = require('bluebird');

mongoose.connect('mongodb://Admin:hack-team2@ds223756.mlab.com:23756/hack-the-machine',()=>{
	console.log('mongodb connected to hack-the-machine database');
}).catch((e) => console.log(e));

module.exports = { mongoose };


