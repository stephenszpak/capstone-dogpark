"use strict";

app.controller("AuthCtrl", function($scope, $rootScope, $location, AuthFactory, UserFactory) {

	if($location.path() === "/logout") {
		AuthFactory.logout();
		$rootScope.user = {};
		$location.url("/auth");
	}
	
		// the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
		$('.modal').modal();

	let logMeIn = function(loginStuff) {
		AuthFactory.authenticate(loginStuff).then(function(didLogin) {
			return UserFactory.getUser(didLogin.uid);
		}).then(function(userCreds) {
			$rootScope.user = userCreds;
			$scope.login = {};
			$scope.register = {};
			$location.url("/search");
		});
	};

	$scope.registerUser = function(registerNewUser) {
		AuthFactory.registerWithEmail(registerNewUser).then(function(didRegister) {
			registerNewUser.uid = didRegister.uid;
			return UserFactory.addUser(registerNewUser);
		}).then(function(registerComplete) {
			logMeIn(registerNewUser);
		});
	};

	$scope.loginUser = function(loginNewUser) {
		logMeIn(loginNewUser);
	};

});