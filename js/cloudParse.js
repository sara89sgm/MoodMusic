/* Manage the visualization of the data using chart.js */
define([
], function () {
   'use strict';

   var exports = {};

   var moods = [];

   function jsonp_receive(data) {
     moods = data.data;
   }


   exports.getMusicGraphData = function(authToken,callback) {
    Parse.Cloud.run('graphData', {'oauth_token': authToken}, {
      success: function(result) {
        console.log("YAY");
        console.log(result);
        // Now load mood data.
         $.ajax({
           url: 'http://pincom.be/fb_mood',
           dataType: 'jsonp',
           success: function(data){
              callback({music: result, mood: data.data});
            },
           data: {token: authToken}
         });

        
      },
      error: function(error) {
      }
    });

   };

   exports.init = function () {

   }


    return exports;

});
