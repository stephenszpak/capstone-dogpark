"use strict";

app.controller('UserProfileCtrl', function($scope, $rootScope, $routeParams, $location, FavoriteFactory, UserFactory) {
	$scope.favoriteList = {};
	$scope.selectedFavorite = {};


	let showFavorites = function() {
		FavoriteFactory.getFavorites($rootScope.user.uid).then(function(data) {
			console.log("favroites", data);
			$scope.favoriteList = data;
		});
    };

    showFavorites();

    $scope.selectedFavorite = {};
	let favId = $routeParams.id;
	console.log("route params", favId);

	FavoriteFactory.getSingleFavorite(favId).then(function(data) {
		console.log("data", data.id);
		data.id = favId;
		$scope.selectedFavorite = data;
	});


	$scope.deleteFavorite = function(favoriteId) {
		FavoriteFactory.deleteFavorite(favoriteId).then(function(response) {
			showFavorites();
		});
	};


	
});