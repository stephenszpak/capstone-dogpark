"use strict";

app.controller('FavoriteDetailsCtrl', function($scope, $routeParams, FavoriteFactory) {

	$scope.selectedFavorite = {};
	let favId = $routeParams.id;

	FavoriteFactory.getSingleFavorite(favId).then(function(data) {
		data.id = favId;
		$scope.selectedFavorite = data;
	});

});