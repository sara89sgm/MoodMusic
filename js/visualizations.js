/* Manage the visualization of the data using chart.js */
define([
], function () {
   'use strict';

   var exports = {};

   exports.showChart = function(data) {
      console.log(data);
      // Data from Sara
      //data.music =
        //{"result":[{"analysis":{"happiness":0.2675323687801678,"energy":0.3726640038127438,"danceability":0.6369283478766309},"time_stamp":"2013-09-26T23:52:11+0000"},{"analysis":{"happiness":0.5953875472428537,"energy":0.9309749190528912,"danceability":0.5610244595602905},"time_stamp":"2013-09-26T23:46:42+0000"},{"analysis":{"happiness":0.5523164488788003,"energy":0.22715739814817476,"danceability":0.5488538507817464},"time_stamp":"2013-09-26T23:43:05+0000"},{"analysis":{"happiness":0.4006982982570874,"energy":0.5264388370016869,"danceability":0.6201066894193128},"time_stamp":"2013-09-26T23:38:05+0000"},{"analysis":{"happiness":0.34225702015386855,"energy":0.324904616136453,"danceability":0.6015190002553635},"time_stamp":"2013-09-26T23:36:00+0000"},{"analysis":{"happiness":0.5075470985293743,"energy":0.4224251360259714,"danceability":0.7260821191518633},"time_stamp":"2013-09-26T23:17:19+0000"},{"analysis":{"happiness":0.3926489691187617,"energy":0.8690673141808812,"danceability":0.6016654690867026},"time_stamp":"2013-09-26T16:36:54+0000"},{"analysis":{"happiness":0.34225702015386855,"energy":0.324904616136453,"danceability":0.6015190002553635},"time_stamp":"2013-09-26T16:33:03+0000"},{"analysis":{"happiness":0.2971584344862579,"energy":0.8342695848347417,"danceability":0.37747332404474626},"time_stamp":"2013-09-26T16:30:52+0000"},{"analysis":{"happiness":0.45109016335673724,"energy":0.5871558690047181,"danceability":0.6492899790965457},"time_stamp":"2013-09-26T16:27:31+0000"},{"analysis":{"happiness":0.7600724912015996,"energy":0.9084344096017962,"danceability":0.7637780496059019},"time_stamp":"2013-09-26T16:14:16+0000"},{"analysis":{"happiness":0.3372386306753028,"energy":0.9145368553809267,"danceability":0.4860179922110671},"time_stamp":"2013-09-26T16:17:21+0000"},{"analysis":{"happiness":0.934784543967117,"energy":0.8441036982249914,"danceability":0.7013117236154822},"time_stamp":"2013-09-26T16:20:34+0000"},{"analysis":{"happiness":0.7184916691458961,"energy":0.7300988167500664,"danceability":0.8352296382883362},"time_stamp":"2013-09-26T16:03:31+0000"},{"analysis":{"happiness":0.7636228001821784,"energy":0.9106313080910301,"danceability":0.6338549206831873},"time_stamp":"2013-09-26T15:59:28+0000"},{"analysis":{"happiness":0.2675323687801678,"energy":0.3726640038127438,"danceability":0.6369283478766309},"time_stamp":"2013-09-26T15:49:31+0000"},{"analysis":{"happiness":0.6384308001213279,"energy":0.7704716101259909,"danceability":0.5830037438844654},"time_stamp":"2013-09-26T15:45:54+0000"},{"analysis":{"happiness":0.5953875472428537,"energy":0.9309749190528912,"danceability":0.5610244595602905},"time_stamp":"2013-09-26T15:42:49+0000"}]};
      var music_data = data.music.result;
      var mood_data = data.mood;

      var happy = [];
      var energy = [];
      var dance = [];
      var time_stamps = [];
      if (!music_data) {
        music_data = [];
      }

      for(var i = 0; i< music_data.length; i++){
        var point = music_data[i];
        var time = Date.parse(point.time_stamp);
        happy.push([time, point.analysis.happiness]);
        dance.push([time, point.analysis.danceability]);
        energy.push([time, point.analysis.energy]);
      }

      // Cast mood to 0 or 1 on the scale
      var mood = [];
      for (var i = 0; i < mood_data.length; i++) {
        var m = mood_data[i];
        if (m.mood == 'pos') {
          mood.push([ m.time * 1000, 1 ]);
        } else {
          mood.push([ m.time * 1000, 0 ]);
        }
      }


      function compare (a,b) {
        if (a[0] < b[0]) {
          return -1;
        }
        if (a[0] > b[0]) {
          return 1;
        }
        return 0;
      }

      happy.sort(compare);
      dance.sort(compare);
      energy.sort(compare);
      mood.sort(compare);

      // Generate fake data
      var s = 1247982210000;
      var gap = 864000000;
      var f_dance = [];
      var f_energy = [];
      var f_happy = [];
      var f_mood = [];
      for (var i = 0; i < 100; i++) {
        f_dance.push([ s, Math.random() ]);
        f_happy.push([ s, Math.random() ]);
        f_energy.push([ s, Math.random() ]);
        f_mood.push([ s, Math.round(Math.random()) ]);
        s = s + gap;
      }

      $('#container').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Music Mood'
        },
        xAxis: {
          type: 'datetime',
        },
        yAxis: {
            title: {
                text: 'Rating'
            }
        },
        series: [{
            name: 'Dance',
            data: dance,
        }, {
            name: 'Happy',
            data: happy,
        }, {
            name: 'Energy',
            data: energy,
        }],
      });

      $('#mood_container').highcharts({
        chart: {
            type: 'areaspline'
        },
        title: {
            text: 'Music Mood'
        },
        xAxis: {
          type: 'datetime',
        },
        yAxis: {
            title: {
                text: 'Mood'
            },
            max: 1,
        },
        series: [{
            name: 'Mood',
            data: mood,
        }]
      });

      //$('#fake_container').highcharts({
        //chart: {
            //type: 'areaspline'
        //},
        //title: {
            //text: 'Music Mood'
        //},
        //xAxis: {
          //type: 'datetime',
        //},
        //yAxis: {
            //title: {
                //text: 'Mood'
            //},
            //max: 1,
        //},
        //series: [{
            //name: 'Happy',
            //data: f_happy,
        //}, {
            //name: 'Mood',
            //data: f_mood,
        //}],
      //});
   };

   exports.init = function () {
   }

   return exports;
});
