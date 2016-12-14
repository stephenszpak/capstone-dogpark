"use strict";

app.controller('UserProfileCtrl', function($scope, $rootScope, $location, UserProfileFactory) {
	$scope.favoriteList = {};
	$scope.profile = {};
	$scope.newProfile = {};

	let showFavorites = function() {
		UserProfileFactory.getFavorites($rootScope.user.uid).then(function(data) {
			console.log("favroites", data);
			$scope.favoriteList = data;
		});
    };

    showFavorites();

    let showProfile = function() {
    	UserProfileFactory.getUserProfile($rootScope.user.uid).then(function(data) {
    		console.log("profile", data);
    		$scope.profile = data;

    	});
    };

    showProfile();

    $scope.addNewProfile = function() {
    	$scope.newProfile.uid = $rootScope.user.uid;
		UserProfileFactory.postUserProfile($scope.newProfile).then(function(data) {
			console.log("new profile", data);
		});
	};

	$scope.deleteFavorite = function(favoriteId) {
		UserProfileFactory.deleteFavorite(favoriteId).then(function(response) {
			showFavorites();
		});
	};

	$scope.showCurrentLocation = function(currentParkId) {
		UserProfileFactory.currentPark(currentParkId).then(function(data) {
			console.log('current location', data);
		});
	};

	//modal
	$(document).ready(function(){
		// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
		$('.modal').modal();
	});
        
});