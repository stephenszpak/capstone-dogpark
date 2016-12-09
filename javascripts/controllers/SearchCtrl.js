"use strict";

app.controller('SearchCtrl', function($scope, $rootScope, GoogleApiFactory) {
   
    $scope.result = {};
    $scope.newFav = {};

	$scope.showDogPark = function(userInput) {
		GoogleApiFactory.textSearch(userInput).then(function(data) {
			console.log("data?", data.results);
			$scope.result = data.results;
		});
	};



	$scope.addFavorite = function(dog) {
		dog.uid = $rootScope.user.uid;
		console.log("this",dog);
		GoogleApiFactory.postNewFav(dog).then(function(data) {
			console.log('single doggo', dog);
		});
	};

});
