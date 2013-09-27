Parse.Cloud.define("graphData", function(request, response) {

    var url = 'https://graph.facebook.com/me/music.listens?fields=data%2Cstart_time&access_token=' + request.params.oauth_token;
    //console.log(url);

    // Get listens from graph.
    Parse.Cloud.httpRequest({
	url: url,
	success: function(httpResponse) {
		console.log(httpResponse);
		var tracks = httpResponse.data;
		var result = [];
	    for (var i = 0; i < tracks.length; i++)
	        var song = tracks[i];
	    	console.log(song);
	        url = song.data.song.url;
	        urlParam = url.split("/");
	        idSong = urlParam[urlParam.length - 1];
	        var songData = {app:song.application.name,
	            id:idSong};
	        var audio_summary_data = getEchoNestId(songData)
	        .then(getAudioSummary(echoNestId))
	        	.then(function(data) {
	        		console.log(data);
	        		
	        	});


    	
	},
	error: function(httpResponse) {
	    console.error('Request failed with code ' + httpResponse.status);
	}
    });


    

});



var getEchoNestId = function(songData){
	console.log(songData);
	var app = '';
	if(songData.app=="Spotify"){
        app="spotify-WW";
    }else if(songData.app=="Deezer"){
        app="deezer";
    }
    var url="http://developer.echonest.com/api/v4/track/profile?api_key=FILDTEOIK2HBORODV&id="+app+":track:"+userSong.id+"&bucket=audio_summary&format=jsonp";
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



var getAudioSummary = function(echoNestId){

	console.log(echoNestId);

	var url="http://developer.echonest.com/api/v4/song/profile?api_key=FILDTEOIK2HBORODV&format=jsonp&id="+echoNestId+"&bucket=audio_summary";
	url=encodeURI(url);
	                
	var promise = Parse.Cloud.httpRequest({
		url: url,
		/*success: function(httpResponse) {
			getAudioSummary(httpResponse.response.track.song_id);
		},
		error: function(httpResponse) {
			console.error('Request failed with code ' + httpResponse.status);
		}*/
	});

	return promise;
}
