function getUserMusicProfile(){
    FB.api('/me/music.listens', function (fbresponse) {

        getComparison(fbresponse.data, meId);

    });
}

function getComparison(data, id) {
    var songsUser = [];
    var i = 0;
    for (i; i < data.length; i++) {
        var song = data[i];
        url = song.data.song.url;
        urlParam = url.split("/");
        idSong = urlParam[urlParam.length - 1];
        //console.log(song);
        songSend = {app:song.application.name,
            id:idSong};
        songsUser.push(songSend);
    }
    //console.log("COMPARISON");
    //console.log(songsUser);
    getEchoNestIDs(songsUser,id);
}


function getEchoNestIDs(userSongs, idUser) {
    

    var i=0;
            for (i;i<userSongs.length&&i<50;i++){
                userSong=userSongs[i];
                var app="";
                if(userSong.app=="Spotify"){
                    app="spotify-WW";

                }else if(userSong.app=="Deezer"){
                    app="deezer";

                }else{
                    continue;
                }
                //get the echonestID
                var url="http://developer.echonest.com/api/v4/track/profile?api_key=FILDTEOIK2HBORODV&id="+app+":track:"+userSong.id+"&bucket=audio_summary&format=jsonp";
                url=encodeURI(url);
                
                $.ajax({
                    url: url,
                    dataType: "jsonp",
                    success: function(data, textStatus, jqXHR){
                        //console.log(data.response);
                        //add the artist's genres to the global genre array
                        getAudioSummary(data.response.track.song_id, idUser);
                        validSongs++;
                        //j gets incremented only when the ajax calls are finished
                        

                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        alert('login error: ' + textStatus);
                    }
                });
            }
            
        
    }



function getAudioSummary(id, idUser){


var url="http://developer.echonest.com/api/v4/song/profile?api_key=FILDTEOIK2HBORODV&format=jsonp&id="+id+"&bucket=audio_summary";
                url=encodeURI(url);
                
                $.ajax({
                    url: url,
                    dataType: "jsonp",
                    success: function(data, textStatus, jqXHR){
                        //add the artist's genres to the global genre array
                        storeAudioSummary(data, idUser);
                        
                        //j gets incremented only when the ajax calls are finished
                        callsFinished++;
                        
                        //when the artists are finished calculate the top genre above all
                        if (callsFinished==(validSongs)) {
                            calculateAverageOfTypes(idUser);
                        }

                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        alert('login error: ' + textStatus);
                    }
                });
}

function storeAudioSummary(data, idUser){
    if(idUser==meId){
        //console.log(data);
        if(typeof(data.response.songs[0].audio_summary)!="undefined"){

            summaryMe[0]=summaryMe[0]+data.response.songs[0].audio_summary.danceability;
            summaryMe[1]+=data.response.songs[0].audio_summary.energy;
            summaryMe[2]+=data.response.songs[0].audio_summary.tempo;
            summaryMe[3]+=1;
            getArtistsGenre(data.response.songs[0].artist_id, meId);
            songsMe.push(""+data.response.songs[0].artist_name+" "+data.response.songs[0].title);
        }
    }else{
        if(typeof(data.response.songs[0].audio_summary)!="undefined"){
            summaryUserSelected[0]+=data.response.songs[0].audio_summary.danceability;
            summaryUserSelected[1]+=data.response.songs[0].audio_summary.energy;
            summaryUserSelected[2]+=data.response.songs[0].audio_summary.tempo;
            summaryUserSelected[3]+=1;
            songsFriend.push(""+data.response.songs[0].artist_name+" "+data.response.songs[0].title);
            getArtistsGenre(data.response.songs[0].artist_id, userIdSelected);
        }
    }
}

//returns nothing but will call calculateTopGenre() when it's finished (if the first AJAX call to Parse is not an error).
function getArtistsGenre(idArtist, userId) {

                //console.log(userId);
                //get the artist's genres
                var url="http://developer.echonest.com/api/v4/artist/terms?api_key=MXG5OCMN63QJ1C5OM&id="+idArtist+"&format=jsonp";
                url=encodeURI(url);

                $.ajax({
                    url: url,
                    dataType: "jsonp",
                    success: function(data, textStatus, jqXHR){
                        //add the artist's genres to the global genre array
                        fillGenresArray(data, userId);
                        
                        //j gets incremented only when the ajax calls are finished
                        genreFinished++;
                        
                        //when the artists are finished calculate the top genre above all
                        if (genreFinished==(validSongs)) {
                             console.log("calculate Top Genre for"+userId);
                            calculateTopGenre(userId);
                        }

                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        alert('login error: ' + textStatus);
                    }
                });
                    

}


