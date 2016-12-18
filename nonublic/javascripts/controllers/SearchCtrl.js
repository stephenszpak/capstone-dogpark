"use strict";

app.controller('SearchCtrl', function($scope, $location, $rootScope, GoogleApiFactory) {
   
    $scope.result = {};

	$scope.showDogPark = function(userInput) {
		GoogleApiFactory.textSearch(userInput).then(function(data) {
			console.log("dog park data", data.results);
			$scope.result = data.results;
		});
	};

	$scope.addFavorite = function(dog) {
		dog.uid = $rootScope.user.uid;
		GoogleApiFactory.postNewFav(dog).then(function(data) {
			console.log('single doggo', dog);
			console.log('photo doggo', dog.photos[0].html_attributions[0]);
			$location.url('/search');
		});
	};

});
