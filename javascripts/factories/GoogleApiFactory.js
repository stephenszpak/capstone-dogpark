"use strict";

app.factory("GoogleApiFactory", function($q, $http, FIREBASE_CONFIG) {


	var textSearch = function(userInput) {
		return $q((resolve, reject) => {
			$http.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=dog+parks+in+${userInput}&key=${FIREBASE_CONFIG.apiKey}`)
			.success(function(response) {
				resolve(response);
			})
			.error(function(errorResponse) {
				reject(errorResponse);
			});
		});
	};


	return{
		textSearch: textSearch
	};

});