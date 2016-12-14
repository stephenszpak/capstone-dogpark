"use strict";

app.factory("UserProfileFactory", function($q, $http, FIREBASE_CONFIG) {

	let getUserProfile = function(user) {
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/profiles.json?orderBy="uid"&equalTo="${user}"`)
			.success(function(response) {
				let profiles = [];
				Object.keys(response).forEach(function(key) {
					response[key].id = key;
					profiles.push(response[key]);
				});
				resolve(profiles);
			})
			.error(function(getSingleError) {
				reject(getSingleError);
			});
		});
	};
	
	let postUserProfile = function(newProfile) {
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/profiles.json`,
				JSON.stringify({
					dogname: newProfile.dogname,
					ownername: newProfile.ownername,
					isCurrent: newProfile.isCurrent,
					uid: newProfile.uid
				})
			)
			.success(function(postResponse) {
				resolve(postResponse);
			})
			.error(function(postError) {
				reject(postError);
			});
		});
	};


	let getFavorites = function (userId) {
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/favorites.json?orderBy="uid"&equalTo="${userId}"`)
			.success(function(response) {
				let favorites = [];
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

	let currentPark = function(currentLocation) {
		return $q((resolve, reject) => {
			$http.put(`${FIREBASE_CONFIG.databaseURL}/profiles/${currentLocation.id}.json`,
				JSON.stringify({
					dogname: currentLocation.dogname,
					ownername: currentLocation.ownername,
					isCurrent: currentLocation.isCurrent,
					uid: currentLocation.uid
				})
			)
			.success(function(currentResponse) {
				console.log("currentpark", currentResponse);
				resolve(currentResponse);
			})
			.error(function(currentError) {
				reject(currentError);
			});
		});
	};

	return {
		getUserProfile: getUserProfile,
		postUserProfile: postUserProfile,
		getFavorites: getFavorites,
		deleteFavorite: deleteFavorite,
		currentPark: currentPark
	};
});