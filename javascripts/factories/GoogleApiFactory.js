"use strict";

app.factory("GoogleApiFactory", function($q, $http, FIREBASE_CONFIG, GOOGLE) {


	let textSearch = function(userInput) {
		return $q((resolve, reject) => {
			$http.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=dog+parks+${userInput}&key=${GOOGLE.apiKey}`)
			.success(function(response) {
				resolve(response);
			})
			.error(function(errorResponse) {
				reject(errorResponse);
			});
		});
	};

	let postNewFav = function(newFav) {
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/favorites.json`,
				JSON.stringify ({
					name: newFav.name,
					address: newFav.formatted_address,
					location: newFav.geometry,
					place_id: newFav.id,
					uid: newFav.uid
				})
			)
			.success(function(postResponse) {
				resolve(postResponse);
			})
			.error(function(postError){
				reject(postError);
			});
		});
	};

	

	return{
		textSearch: textSearch,
		postNewFav: postNewFav
	};

});