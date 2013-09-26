Parse.Cloud.define("graphData", function(request, response) {

    var url = 'https://graph.facebook.com/me/music.listens?fields=data%2Cstart_time&access_token=' + request.params.oauth_token;
    console.log(url);

    // Get listens from graph.
    Parse.Cloud.httpRequest({
	url: url,
	success: function(httpResponse) {
	    console.log(httpResponse.text);
	},
	error: function(httpResponse) {
	    console.error('Request failed with code ' + httpResponse.status);
	}
    });


    response.success({
	listen_data: [[0.1, 0.2, 0.3], [0.1, 0.2, 0.3], [0.1, 0.2, 0.3], [0.1, 0.2, 0.3], [0.1, 0.2, 0.3], [0.2, 0.4, 0.6], [0.1, 0.2, 0.3],],
    });

});
