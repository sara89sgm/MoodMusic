/* Manage the visualization of the data using chart.js */
define([
], function () {
   'use strict';

   var exports = {};

   exports.getMusicGraphData = function(authToken,callback) {
      $.ajax({
         type: "POST",
         url: "https://api.parse.com/1/functions/graphData",
         data: {'oauth_token': authToken},
         success: function (data) {
            console.log("YAY");
            callback(data);
         }
        });
   };

   
   exports.init = function () {
        
   }


    return exports;

});