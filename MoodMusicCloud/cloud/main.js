Parse.Cloud.define("graphData", function(request, response) {

    var url = 'https://graph.facebook.com/me/music.listens?fields=data%2Cstart_time,application&access_token=' + request.params.oauth_token;
    console.log(url);

    // Get listens from graph.
    Parse.Cloud.httpRequest({
	url: url,
	success: function(httpResponse) {
		
		var tracks = httpResponse.data.data;
		//console.log(tracks);
		//console.log(tracks[0]);
	    for (var i = 0; i < tracks.length; i++){
	        var track = tracks[i];
	        url = track.data.song.url;
	        
	        urlParam = url.split("/");
	        idSong = urlParam[urlParam.length - 1];
	        var songData = {'app':track.application.name,
	            'id':idSong};
	        var audio_summary_data = getEchoNestId(songData)
	        .then(
	        	function(object) {
	        		console.log("Success");
	        		if(object.data.response.track){
	        			console.log(object.data.response.track.audio_summary);	
	        		}
	        		
			  	},
			  	function(error) {

			    	console.log("error");
			  	});
	    }

    	
	},
	error: function(httpResponse) {
	    console.error('Request failed with code ' + httpResponse.status);
	}
    });


    

});



var getEchoNestId = function(songData){
	var app = '';
	if(songData.app === "Spotify"){
        app="spotify-WW";
    }else if(songData.app === "Deezer"){
        app="deezer";
    }
    var url="http://developer.echonest.com/api/v4/track/profile?api_key=MXG5OCMN63QJ1C5OM&id="+app+":track:"+songData.id+"&bucket=audio_summary&format=json";
    url=encodeURI(url);
    var promise = Parse.Cloud.httpRequest({
		url: url
		/*success: function(httpResponse) {
			getAudioSummary(httpResponse.response.track.song_id);
		},
		error: function(httpResponse) {
		    console.error('Request failed with code ' + httpResponse.status);
		}*/
    });

    return promise;
}; 

