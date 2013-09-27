/* Manage the visualization of the data using chart.js */
define([
], function () {
   'use strict';

   var exports = {};

   exports.showChart = function(data) {
      console.log(data);
      var music_data = data.music;
      var mood_data = data.mood;
      processData(music_data);
   };

   var processData = function(musicAnalysis){
      var happiness = [];
      var energy = [];
      var dance = [];
      var time_stamps = [];
      for(var i = 0; i<musicAnalysis.length; i++){
         var point = musicAnalysis[i];
         happiness.push(point.analysis.happiness);
         energy.push(point.analysis.energy);
         dance.push(point.analysis.dance);
         //debugger;
         var time = Date.parse(point.time_stamp)/1000;
         console.log(time);
         time_stamps.push(time);
      }


      $('#container').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Music Mood'
        },
        xAxis: {
            categories: ['Apples', 'Bananas', 'Oranges']
        },
        yAxis: {
            title: {
                text: 'Fruit eaten'
            }
        },
        series: [{
            name: 'Jane',
            data: [1, 0, 4]
        }, {
            name: 'John',
            data: [5, 7, 3]
        }]
    });
      var music_data = {
         labels : time_stamps,
         datasets : [
            {
               fillColor : "rgba(129, 179, 0, 0.5)",
               strokeColor : "rgba(129, 179, 0, 0.9)",
               pointColor : "rgba(129, 179, 0, 1)",
               pointStrokeColor : "#fff",
               data : happiness
            },
            {
               fillColor : "rgba(215, 40, 40, 0.5)",
               strokeColor : "rgba(215, 40, 40, 0.9)",
               pointColor : "rgba(215, 40, 40, 1)",
               pointStrokeColor : "#fff",
               data : energy
            },
            {
               fillColor : "rgba(23, 126, 255, 0.5)",
               strokeColor : "rgba(23, 126, 255, 0.9)",
               pointColor : "rgba(23, 126, 255, 1)",
               pointStrokeColor : "#fff",
               data : dance
            }
         ]
      };
      var ctx = $("#myChart").get(0).getContext("2d");
      //This will get the first returned node in the jQuery collection.
      var myNewChart = new Chart(ctx).Line(music_data);

   };


   exports.init = function () {

   }


   return exports;

});
