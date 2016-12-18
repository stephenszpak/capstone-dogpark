"use strict";

app.controller('FavoriteCtrl', function($scope, $rootScope, $filter, $routeParams, $location, FavoriteFactory, UserFactory) {
	$scope.favoriteList = {};
	$scope.selectedFavorite = {};


	let showFavorites = function() {
		FavoriteFactory.getFavorites($rootScope.user.uid).then(function(data) {
			console.log("favroites", data);
			$scope.favoriteList = data;
		});
    };

    showFavorites();

	$scope.deleteFavorite = function(favoriteId) {
		FavoriteFactory.deleteFavorite(favoriteId).then(function(response) {
			showFavorites();
		});
	};

});