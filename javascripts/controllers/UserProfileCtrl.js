"use strict";

app.controller('UserProfileCtrl', function($scope, $rootScope, $location, UserProfileFactory, $routeParams) {
	$scope.createUserProfile = false;
	$scope.showUserProfile = true;


	$scope.setCreateUserProfileContainer = function() {
		$scope.createUserProfile = true;
		$scope.showUserProfile = false;
	};

	$scope.setUserProfileContainer = function() {
		$scope.createUserProfile = false;
		$scope.showUserProfile = true;
	};

	$scope.newProfile = {};

	$scope.addProfile = function() {
		$scope.newProfile.uid = $rootScope.user.uid;
		UserProfileFactory.postUserProfile($scope.newProfile).then(function() {
			$location.url("/users/profile");
			$scope.newProfile = "";
			});
	};

	$scope.selectedUser = {};
	let userId = $routeParams.id;
	console.log("route params", userId);

	UserProfileFactory.getUserProfile().then(function(oneUser) {
		oneUser.id = userId;
		$scope.selectedUser = oneUser;
		console.log("single user maybe", oneUser);
	});

  	
	    
});