
var BloomFilter = require('bloomfilter').BloomFilter,
	async		= require('async'),
	_			= require('underscore');


function hBloom(obj, internal) {

	function flattenObj (obj) {
		if (_.isArray(obj)) return obj;
		else {
			return _.flatten(_.map(obj, function(val, i){
				return flattenObj(val);
			}));
		}
	}

	function arrayEndpoint (obj) {
		var bloom = new BloomFilter(
			32 * 256, // number of bits to allocate.
			16        // number of hash functions.
		);

		//console.log("created bloom for: ", obj);
		for (var x in obj) { bloom.add(obj[x]); }
		
		if (internal) return [obj, bloom, []];
		else return bloom;
	}

	function nonBasicObject (obj) {
		var children = {};
		var items = _.map(obj, function(item, i) {
			//console.log("mapping over: ", item);
			var result = hBloom(item, true);
			children[i] = result;
			return result[0];
		});

		var bloom2 = new BloomFilter(
			32 * 256, // number of bits to allocate.
			16        // number of hash functions.
		);

		var flattenedItems = _.flatten(items);
		for (var item in flattenedItems) {bloom2.add(flattenedItems[item]);}
		if (internal) return [flattenedItems, bloom2, children];
		else return {
			classify: function(word){
				return recursiveBloomTest(word, ["", this.self, this.children]);
			},
			classifyText: function (text, cb){
				
				var that = this;
				var words = text.toLowerCase()
					.replace(/[^\w|\d|\-|_|\s]+/gi, " ")
					.replace(/\s+/g, " ")
					.split(' ');
					
				async.map(words, function(w, callback){
					callback(null, that.classify(w));
				}, function(err, result){
					async.filter(result, function(x, callback){
						callback(x ? x : false);
					}, cb);
				});

			},
			self: bloom2,
			children: children
		};
	}

	function recursiveBloomTest(word, hBloom) {
				
		if (hBloom[1].test(word)) {
			for (var x in hBloom[2]) {
				var result = recursiveBloomTest(word, hBloom[2][x]);
				if (result && typeof result === 'boolean') return x;
				else if (result) return  _.flatten([x, result]); // Optionally remove flatten for optimisation
			}
			return true;
		} else return false;

	}

	if (_.isArray(obj)) return arrayEndpoint(obj);
	else return nonBasicObject(obj);
	
}

module.exports = hBloom;







