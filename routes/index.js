var express = require('express');
var router = express.Router();
var async = require('async');
var uber = require('../functions/uber');
var lyft = require('../functions/lyft');
/* GET home page. */
router.get('/', function(req, res, next) {
  if (typeof req.query.start_latitude == "undefined" || typeof req.query.start_longitude == "undefined") {
  	var err = new Error('Missing lat or long');
  	err.status = 400;
  	next(err);
  } else {
  	async.parallel({
  	    lyft: function(callback) { lyft(req.query, callback) },
  	    uber: function(callback) { uber(req.query, callback) },
  	}, function(err, results) {
  		res.json(results)
  	});
  }
});

module.exports = router;