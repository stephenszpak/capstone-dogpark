"use strict";

app.factory("FavoriteFactory", function($q, $http, FIREBASE_CONFIG) {

	let postNewFav = function(newFav) {
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/favorites.json`,
				JSON.stringify ({
					uid: newFav.uid,
					placeid: newFav.placeid,
					photo: newFav.photo,
					title: newFav.title,
					location: newFav.location,
					address: newFav.address,
					phone_number: newFav.phone_number,
					website: newFav.website,
					rating: newFav.rating,
					price: newFav.price,
					reviews: newFav.reviews,
					hours: newFav.hours,
					detailed_icon: newFav.detailed_icon,
					types: newFav.types
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
		postNewFav: postNewFav
	};
});