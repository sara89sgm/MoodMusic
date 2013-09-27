// Parse.Cloud.define("graphData", function(request, response) {

//     var url = 'https://graph.facebook.com/me/music.listens?fields=data%2Cstart_time,application&access_token=' + request.params.oauth_token;
//     console.log(url);

//     // Get listens from graph.
//     return Parse.Cloud.httpRequest({
// 		url: url
// 	}).then(function(httpResponse)){

// 		var tracks = httpResponse.data.data;
// 		var results = [];
// 		//console.log(tracks);
// 		//console.log(tracks[0]);
// 	    for (var i = 0; i < tracks.length; i++){
// 	        var track = tracks[i];
// 	        url = track.data.song.url;

// 	        urlParam = url.split("/");
// 	        idSong = urlParam[urlParam.length - 1];
// 	        var songData = {'app':track.application.name,
// 	            'id':idSong, 'time_stamp': track.start_time};
// 	        var audio_summary_data = getEchoNestId(songData)
// 	        .then(
// 	        	function(object) {
// 	        		if(object.data.response.status.message === 'Success'){

// 	        			getAudioSummary(object.data.response.track["song_id"])
// 	        			.then(
// 	        				//Success
// 	        				function(object) {
// 		        					//console.log(object.data.response.songs[0].audio_summary);
// 		        					var result = {'analysis': {
// 		        									'happiness': object.data.response.songs[0].audio_summary.valence,
// 		        									'energy': object.data.response.songs[0].audio_summary.energy,
// 		        									'danceability' : object.data.response.songs[0].audio_summary.danceability
// 		        									},
// 		        									'time_stamp': songData.time_stamp
// 		        								};
// 		        					console.log(result);
// 		        					results.push(result);

// 		        			},
// 		        			function(error){
// 		        				console.log("error");
// 		        				console.log(error);
// 		        			}
// 		        		);
// 	        		}

// 			  	},
// 			  	function(error) {

// 			    	console.log("error");
// 			  	});
// 	    }


// 	},
// 	error: function(httpResponse) {
// 	    console.error('Request failed with code ' + httpResponse.status);
// 	}
//     });

// });
var results = [];

Parse.Cloud.define("graphData", function(request, response) {

    var url = 'https://graph.facebook.com/me/music.listens?fields=data%2Cstart_time,application&access_token=' + request.params.oauth_token;
    console.log(url);

    // Get listens from graph.
    return Parse.Cloud.httpRequest({
		url: url
	}).then(function(httpResponse) {


		var tracks = httpResponse.data.data;
		
		var promises = [];
		//console.log(tracks);
		//console.log(tracks[0]);
	    for (var i = 0; i < tracks.length; i++){
	        var track = tracks[i];
	        url = track.data.song.url;

	        urlParam = url.split("/");
	        idSong = urlParam[urlParam.length - 1];
	        var songData = {'app':track.application.name,
	            'id':idSong, 'time_stamp': track.start_time};
	        if(idSong!=''){
	        	promises.push(getEchoNestId(songData));
	        }
	         
	    }

	    return Parse.Promise.when(promises);
	 }).then(function(data) {
		console.log("RESULT");
		console.log(results);
		response.success(results);
	},
	function(error){
		console.log("error");
	   console.log(error.data);
	});


});



var getEchoNestId = function(songData){
	var def = new Parse.Promise();
	var app = '';
	if(songData.app === "Spotify"){
        app="spotify-WW";
    }else if(songData.app === "Deezer"){
        app="deezer";
    }
    var url="http://developer.echonest.com/api/v4/track/profile?api_key=MXG5OCMN63QJ1C5OM&id="+app+":track:"+songData.id+"&bucket=audio_summary&format=json";
    url=encodeURI(url);

    Parse.Cloud.httpRequest({
		url: url,
		success: function(object) {
			if(object.data.response.status.message === 'Success'){

				console.log (object.data.response.track["song_id"]);
			
				getAudioSummary(object.data.response.track["song_id"], def, songData.time_stamp);
			} else {
				def.resolve("Error");
			}
			
		},
		error: function(httpResponse) {
		    def.resolve("Error");
		}

	});

	return def;
		/*success: function(httpResponse) {
			getAudioSummary(httpResponse.response.track.song_id);
		},
		error: function(httpResponse) {
		    console.error('Request failed with code ' + httpResponse.status);
		}*/
};



var getAudioSummary = function(echoNestId, def, time_stamp){

	console.log(echoNestId);

	var url="http://developer.echonest.com/api/v4/song/profile?api_key=MXG5OCMN63QJ1C5OM&format=json&id="+echoNestId+"&bucket=audio_summary";
	url=encodeURI(url);


	Parse.Cloud.httpRequest({
		url: url,
		success: function(httpResponse) {
			var summary = httpResponse.data;
			console.log(httpResponse.data);
			var result = {'analysis': {
		        	'happiness': summary.response.songs[0].audio_summary.valence,
		        	'energy': summary.response.songs[0].audio_summary.energy,
		        	'danceability' : summary.response.songs[0].audio_summary.danceability
		       	},
		        	'time_stamp': time_stamp
		    };
			results.push(result);

			def.resolve(httpResponse.data.response);
		},
		error: function(httpResponse) {
			def.resolve("error");
		}
	});


};






