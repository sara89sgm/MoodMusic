define([
    'js/visualizations',
    'js/cloudParse', 
    'facebook'
], function (Visualizations, CloudParse) {
    'use strict';

    var exports = {};

    var initFB = function() {

        // init the FB JS SDK
        FB.init({
          appId      : '124421614395186',                        // App ID from the app dashboard
          channelUrl : 'http://moodmusic.parseapp.com/channel.html', // Channel file for x-domain comms
          status     : true,                                 // Check Facebook Login status
          xfbml      : true                                  // Look for social plugins on the page
        });
 
      FB.Event.subscribe('auth.authResponseChange', function(response) {
        // Here we specify what we do with the response anytime this event occurs. 
        if (response.status === 'connected') {
            console.log("Response");
            getMusicChart(response.authResponse.accessToken);
        } else if (response.status === 'not_authorized') {
            FB.login(function(response) {
                    // handle the response
            }, {scope: 'user_actions.music,read_stream'});
        } else {
            FB.login(function(response) {
                    // handle the response
            }, {scope: 'user_actions.music,read_stream'});
        }
      });
    };

    var getMusicChart = function(accessToken){
        console.log(accessToken);
        CloudParse.getMusicGraphData(accessToken, Visualizations.showChart);
    };
    

   
    exports.init = function () {
        initFB();
    }


    return exports;

});