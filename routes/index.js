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
  	var qs = req.query;
  	async.parallel({
  	    lyft: function(callback1) { lyft(qs, callback1) },
  	    uber: function(callback2) { uber(qs, callback2) },
  	}, function(err, results) {
  		res.json(results)
  	});
  }
});

module.exports = router;