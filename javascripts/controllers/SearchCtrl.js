"use strict";

app.controller('SearchCtrl', function($scope, $rootScope, uiGmapGoogleMapApi, GoogleApiFactory) {
   
    $scope.result = {};

	$scope.showDogPark = function(userInput) {
		GoogleApiFactory.textSearch(userInput).then(function(data) {
			console.log("data?", data.results);
			$scope.result = data.results;
		});
	};

	
});
