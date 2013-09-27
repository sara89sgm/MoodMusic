/* Manage the visualization of the data using chart.js */
define([
], function () {
   'use strict';

   var exports = {};

   exports.showChart = function(data) {
      console.log(data);
      music_data = data.music;
      mood_data = data.mood;
      var ctx = $("#myChart").get(0).getContext("2d");
      //This will get the first returned node in the jQuery collection.
      var myNewChart = new Chart(ctx).Line(music_data,options);
   };


   exports.init = function () {

   }


   return exports;

});
