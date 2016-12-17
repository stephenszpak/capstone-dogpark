"use strict";

app.controller('UserProfileCtrl', function($scope, $rootScope, $location, UserProfileFactory, UserFactory) {
	$scope.favoriteList = {};
	$scope.newProfile = {};

	let showFavorites = function() {
		UserProfileFactory.getFavorites($rootScope.user.uid).then(function(data) {
			console.log("favroites", data);
			$scope.favoriteList = data;
		});
    };

    showFavorites();

    $scope.addNewFriend = function() {
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

	$scope.addNewProfile = function() {
		UserProfileFactory.editProfile($scope.newProfile).then(function(response) {
			console.log("cunt", response);
			$scope.newProfile = {};
		});
	};


	//modal
	$(document).ready(function(){
		// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
		$('.modal').modal();
	});
        
});