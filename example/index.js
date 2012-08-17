

var hBloom = require('../hBloom');
var _ = require('underscore');


// This example tests 5000 tweets against 16000 tag words
// and takes on average 4000 milliseconds. (0.8 ms per tweet)

var tweets = require('./tweets');
var Data = require('./categories');
var sportBloom = hBloom(Data);


console.log("Setup complete.");
var numTweets =_.keys(tweets).length;
var start = new Date();

var results = [];
_.map(tweets , function(obj){
	sportBloom.classifyText(obj.tweet, function(result){
		results.push(result);
	});
});

var end = new Date();

console.log(numTweets + " Tweets to tag.");
console.log("START: ", start);
console.log("END: " + results.length + " done. ", end);
console.log("TOOK: " + (end - start) + " milliseconds.");
console.log(((end - start) / numTweets) + " milliseconds per tweet.");

// console.log("Results: ", results);



