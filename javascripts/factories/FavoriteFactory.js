"use strict";

app.factory("FavoriteFactory", function($q, $http, FIREBASE_CONFIG) {

	let getSingleFavorite = function(favId) {
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/favorites/${favId}.json`)
			.success(function(getSingleResponse) {
				console.log(getSingleResponse);
				resolve(getSingleResponse);
			})
			.error(function(getSingleError) {
				reject(getSingleError);
			});
		});
	};


	let getFavorites = function (userId) {
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/favorites.json?orderBy="uid"&equalTo="${userId}"`)
			.success(function(response) {
				let favorites = [];
				console.log("butts", favorites);
				Object.keys(response).forEach(function(key) {
					response[key].id = key;
					favorites.push(response[key]);
				});
				resolve(favorites);
			})
			.error(function(getFavError) {
				reject(getFavError);
			});
		});
	};

	let deleteFavorite = function(favoriteId) {
		return $q((resolve, reject) => {
			$http.delete(`${FIREBASE_CONFIG.databaseURL}/favorites/${favoriteId}.json`)
			.success(function(deleteResponse) {
				resolve(deleteResponse);
			})
			.error(function(deleteError) {
				reject(deleteError);
			});
		});
	};

	return {
		getFavorites: getFavorites,
		deleteFavorite: deleteFavorite,
		getSingleFavorite: getSingleFavorite
	};
});