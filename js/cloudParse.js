/* Manage the visualization of the data using chart.js */
define([
], function () {
   'use strict';

   var exports = {};

   exports.getMusicGraphData = function(authToken,callback) {
      $.ajax({
         type: "POST",
         url: url,
         data: {'authToken': authToken},
         success: function (data) {
            callback(data);
         }
        });
   };

   
   exports.init = function () {
        
   }


    return exports;

});