"use strict";
let isAuth = (AuthFactory) => new Promise((resolve, reject) => {
	if(AuthFactory.isAuthenticated()){
		resolve();
	} else {
		reject();
	}
});

app.run(function($rootScope, $location, FIREBASE_CONFIG, AuthFactory) {
	firebase.initializeApp(FIREBASE_CONFIG);

	$rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){

		let logged = AuthFactory.isAuthenticated();
		let appTo;
		if(currRoute.originalPath) {
			appTo = currRoute.originalPath.indexOf('/auth') !== -1;
		}
		
		if(!appTo && !logged) {
			event.preventDefault();
			$location.path('/auth');
		}

	});
});



app.config(function($routeProvider, uiGmapGoogleMapApiProvider) {
	$routeProvider
		.when('/auth', {
			templateUrl: 'partials/auth.html',
			controller: 'AuthCtrl'
		})
		.when('/userprofile', {
			templateUrl: 'partials/userprofile.html',
			controller: 'UserProfileCtrl'
		})
		.when('/search', {
			templateUrl: 'partials/search.html',
			controller: 'SearchCtrl'
		})
		.otherwise('auth');

		uiGmapGoogleMapApiProvider.configure({
	        key: 'AIzaSyDTYUC9Vs2Luy8azl5p9qcgnWf2XlVuiRM',
	        v: '3.20', //defaults to latest 3.X anyhow
	        libraries: 'weather,geometry,visualization'
    	});
});