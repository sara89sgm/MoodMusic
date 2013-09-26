Parse.Cloud.define("graphData", function(request, response) {
    var oauthToken = request.params.oauth_token;
    
    // Get listens from graph.
    Parse.Cloud.httpRequest({
	url: 'https://graph.facebook.com/me/music.listens?fields=data%2Cstart_time&method=GET&format=json&suppress_http_code=1&access_token=' + oauthToken;
	success: function(httpResponse) {
	    console.log(httpResponse.text);
	},
	error: function(httpResponse) {
	    console.error('Request failed with code ' + httpResponse.status);
	}
    });
});