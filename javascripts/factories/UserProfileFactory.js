"use strict";

app.factory("UserProfileFactory", function($q, $http, FIREBASE_CONFIG) {

	let getUserProfile = function(userId) {
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/profiles/${userId}.json`)
			.success(function(getSingleResponse) {
				resolve(getSingleResponse);
			})
			.error(function(getSingleError) {
				reject(getSingleError);
			});
		});
	};

	let postUserProfile = function(profile) {
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/profiles.json`,
				JSON.stringify({
					dogname: profile.dogname,
					ownername: profile.ownername,
					currentlocation: profile.currentlocation,
					favdogpark: profile.favdogpark,
					uid: profile.uid
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


	return {
		getUserProfile: getUserProfile,
		postUserProfile: postUserProfile
	};
});