hBloom
=========
Hierarchical bloom classifier for tagging text with a structured word list.



This has prpbably been solved before by smater people than myself. Given a structured tree of categories and corresponding words/strings, **hBloom** will create a bloom filter for each level of depth in the data, which returns true/false for all sub categories, in the case of 'true' it will return the matching categories.


##Install

	npm install hBloom

##Usage

	var hBloom = require('../hBloom');

	var myBloom = hBloom( {STRUCTURED DATA} );
	var txt = "This post is about celtic and rangers, but mentions villa.";

	myBloom.classifyText(txt, function(result){
		console.log(result);
	});

##Methods

	**classifyText( text, callback )**

	**classify( word )**



##License

Not sure yet, busy deciding, most likely MIT.
	
Copyright 2012 Christopher de beer