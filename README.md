hBloom
=========
Hierarchical bloom classifier for tagging text with a structured word list.



This has prpbably been solved before by smater people than myself.


##Install

	npm install hBloom

##Usage

	var hBloom = require('../hBloom');

	var myBloom = hBloom( {STRUCTURED DATA} );
	var txt = "This post is about celtic and rangers, but mentions villa.";

	myBloom.classifyText(txt, function(result){
		console.log(result);
	});


#License

Not sure yet, busy deciding, most likely MIT.
	
Copyright 2012 Christopher de beer