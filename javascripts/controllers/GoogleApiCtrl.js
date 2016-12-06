"use strict";

app.controller('GoogleApiCtrl', function($scope, uiGmapGoogleMapApi){
	// // Do stuff with your $scope.
 //    // Note: Some of the directives require at least something to be defined originally!
 //    // e.g. $scope.markers = []
	$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
 //    // uiGmapGoogleMapApi is a promise.
 //    // The "then" callback function provides the google.maps object.
    console.log("uiGmapGoogleMapApi", uiGmapGoogleMapApi);
});



