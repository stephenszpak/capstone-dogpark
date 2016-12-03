"use strict";

app.factory("GoogleApiFactory", function($q, $http) {


	var textSearch = function(searchId) {
		return $q((resolve, reject) => {
			$http.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=dog+parks+in+Nasvhille&key=AIzaSyDTYUC9Vs2Luy8azl5p9qcgnWf2XlVuiRM`)
			.success(function(response) {
				resolve(response);
				console.log("hey", response);
			
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