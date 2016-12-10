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
			$location.url("/profile");
		});
	};

	$scope.deleteFavorite = function(favoriteId) {

		UserProfileFactory.deleteFavorite(favoriteId).then(function(response) {
			showFavorites();
		});
	};

	$(document).ready(function(){
	    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
	    $('.modal').modal();
  	});
});




















	// $scope.createUserProfile = false;
	// $scope.showUserProfile = true;


	// $scope.setCreateUserProfileContainer = function() {
	// 	$scope.createUserProfile = true;
	// 	$scope.showUserProfile = false;
	// };

	// $scope.setUserProfileContainer = function() {
	// 	$scope.createUserProfile = false;
	// 	$scope.showUserProfile = true;
	// };

	// $scope.newProfile = {};

	// $scope.addProfile = function() {
	// 	$scope.newProfile.uid = $rootScope.user.uid;
	// 	UserProfileFactory.postUserProfile($scope.newProfile).then(function() {
	// 		$location.url("/users/profile");
	// 		$scope.newProfile = "";
	// 		});
	// };

	// $scope.selectedUser = {};
	// let userId = $routeParams.id;
	// console.log("route params", userId);

	// UserProfileFactory.getUserProfile().then(function(oneUser) {
	// 	oneUser.id = userId;
	// 	$scope.selectedUser = oneUser;
	// 	console.log("single user maybe", oneUser);
	// });

  	
