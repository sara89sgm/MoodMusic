/* Manage the visualization of the data using chart.js */
define([
], function () {
   'use strict';

   var exports = {};

   exports.getMusicGraphData = function(authToken,callback) {
    Parse.Cloud.run('graphData', {'oauth_token': authToken}, {
      success: function(result) {
        console.log("YAY");
        console.log(result);
        callback(result);
      },
      error: function(error) {
      }
    });
      
   };

   
   exports.init = function () {
        
   }


    return exports;

});