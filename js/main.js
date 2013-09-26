define([
    'js/visualizations',
    'js/cloudParse'
], function (Visualizations, CloudParse) {
    'use strict';

    var exports = {};

    var initFB = function() {
 
      FB.Event.subscribe('auth.authResponseChange', function(response) {
        // Here we specify what we do with the response anytime this event occurs. 
        if (response.status === 'connected') {
            getMusicChart(response.authResponse.accessToken);
        } else if (response.status === 'not_authorized') {
            FB.login();
        } else {
            FB.login();
        }
      });
    };

    var getMusicChart = function(accessToken){
        CloudParse.getMusicGraphData(accessToken, Visualizations.showChart);
    };
    

   
    exports.init = function () {
        
    }


    return exports;

});