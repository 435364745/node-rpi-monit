var storage = require('../core/storage'), libs = require('../libs');

var stats = function(req, res) {

	var lib = libs.get(req.params.thing);

	if(lib && lib.update > 0) {

		lib.getStats(req.params, function(err, stats) {
			if(err)
				res.json({err : err});
			else
				res.json(stats);
		});

	} else 
		res.json({err: req.params.thing + ' has no stats'});
	
}

var librairie = function(req, res) {
	var lib = libs.get(req.params.thing);

	if(lib)
		res.json(lib.attributes);
}

module.exports = function(app){

	app.get('/', function(req, res) {
		res.render('index', { 
			os: libs.get('os').attributes,
			memory: libs.get('memory').attributes,
			network: libs.get('network').attributes,
			hdd: libs.get('hdd').attributes,
			cpu: libs.get('cpu').attributes,
			intervals: {
				memory: libs.get('memory').update,
				cpu: libs.get('cpu').update
			}
		});
	});

	app.get('/stats/(:thing)', stats);
	app.get('/stats/(:thing)/(:option)', stats);

	app.get('/(:thing)', librairie);
};