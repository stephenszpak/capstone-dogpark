"use strict";

app.controller("AuthCtrl", function($scope, $rootScope, $location, GoogleApiFactory, AuthFactory, UserFactory) {
	$scope.loginContainer = true;
	$scope.registerContainer = false;
	$scope.login = {
		email: "a@a.com",
		password: "123123"
	};

	if($location.path() === "/logout") {
		AuthFactory.logout();
		$rootScope.user = {};
		$location.url("/auth");
	}

	 $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
  });

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

	$scope.setLoginContainer = function() {
		$scope.loginContainer = true;
		$scope.registerContainer = false;
	};

	$scope.setRegisterContainer = function() {
		$scope.loginContainer = false;
		$scope.registerContainer = true;
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