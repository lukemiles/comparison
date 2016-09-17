var config = require('../config');
var request = require("request");

module.exports = function(qs, callback) {
	var requestConfig = {
		url: 'https://api.uber.com/v1/estimates/price',
		headers: {
			'Authorization': "Token " + config("uber_server_token")
		},
		qs: qs
	}
	request(requestConfig, function(err, response, body) {
		try {
			var response = JSON.parse(body);
		} catch (e) {
			var response = {error: true};
		}
		callback(null, response);
	});
}