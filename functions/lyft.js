var config = require('../config');
var request = require("request");
var moment = require("moment");
var token = null;

var getAccessToken = function(callback) {
	if (token !== null && moment().isBefore(token.expiration)) {
		callback(token.access_token);
	} else {
		var requestOptions = {
			url: "https://api.lyft.com/oauth/token",
			method: "POST",
			auth: {user: config('lyft_client_id'), pass: config('lyft_client_secret')},
			body: {"grant_type": "client_credentials", "scope": "public"},
			json: true
		}
		request(requestOptions, function(err, res, body) {
			token = body;
			token.expiration = moment().add(body.expires_in, "seconds");
			callback(token.access_token);
		})
	}
} 


module.exports = function(qs, callback) {
	getAccessToken(function(accessToken) {
		var requestOptions = {
			url: "https://api.lyft.com/v1/cost",
			qs: {"start_lat" : qs.start_latitude, "start_lng": qs.start_longitude, "end_lat": qs.end_latitude, "end_lng": qs.end_longitude},
			headers: {
				'Authorization': "Bearer " + accessToken
			},
		}
		request(requestOptions, function(err, response, body) {
			try {
				var response = JSON.parse(body);
			} catch (e) {
				var response = {error: true};
			}
			callback(null, response);
		});
	});
}