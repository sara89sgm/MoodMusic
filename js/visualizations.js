/* Manage the visualization of the data using chart.js */
define([
], function () {
   'use strict';

   var exports = {};

   exports.showChart = function(data) {
      console.log(data);
      var ctx = $("#myChart").get(0).getContext("2d");
      //This will get the first returned node in the jQuery collection.
      var myNewChart = new Chart(ctx).Line(data,options);
      
   };

   
   exports.init = function () {
        
   }


   return exports;

});
