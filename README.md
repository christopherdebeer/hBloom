hBloom
=========
Hierarchical bloom classifier for tagging text with a structured word list.



This has prpbably been solved before by smater people than myself.


#Install

	npm install hBloom

#Usage

	

	var hBloom = require('../hBloom');

	var Data = {
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
	};


	var sportBloom = hBloom(Data);


	var txt = "This post is about celtic and rangers, but mentions villa.";

	sportBloom.classifyText(txt, function(result){
		console.log(result);
	});


	
