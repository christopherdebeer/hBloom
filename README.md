hBloom
=========
Hierarchical bloom classifier for tagging text with a structured word list.



This has prpbably been solved before by smater people than myself. Given a structured tree of categories and corresponding words/strings, **hBloom** will create a bloom filter for each level of depth in the data, which returns true/false for all sub categories, in the case of 'true' it will return the matching categories.

An example is available at `example/index.js`. The example tests 5000 tweets against 16000 tag words and takes on average 4000 milliseconds. (0.8 ms per tweet)


##Install

	npm install hbloom

##Usage

	var hBloom = require('../hbloom');

	var myBloom = hBloom( {STRUCTURED DATA} );
	var txt = "This post is about celtic and rangers, but mentions villa.";

	myBloom.classifyText(txt, function(result){
		console.log(result);
	});

##Methods

**classifyText( text, callback )**

**classify( word )**


##Structured Data?

The data passed to `hBloom({DATA})` should follow the example below. Where keys are tags/categories and strings in arrays or matching words.

	{
		"racing": {
			"asscot": ["asscot", "ass", "the big race"]
		},
		"football": {
			"manchester united": ["manu", "man united", "mufc", "manchester united", "manufc"],
			"aston villa": ["aston villa", "villa" , "villafc"],
			"manchester city": ["mancity", "manchester city", "cityfc", "man city", "mancityfc"],
			"scottish league": {
				"dundee united": ["dundee", "dundee united", "dundeefc"],
				"rangers": ["rangers","rangersfc"],
				"celtic": ["celtic", "celticfc"]
			}
		}
	}

##License

Not sure yet, busy deciding, most likely MIT.
	
Copyright 2012 Christopher de beer