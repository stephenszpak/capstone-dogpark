"use strict";

app.factory("UserFactory", function($q, $http, FIREBASE_CONFIG) {

	let addUser = (authData) => {
		return $q((resolve, reject) => {
			$http.post(`${FIREBASE_CONFIG.databaseURL}/users.json`,
				JSON.stringify({
					uid: authData.uid,
					ownername: authData.ownername,
					dogname: authData.dogname
				})
			)
			.success(function(storeUserSuccess) {
				resolve(storeUserSuccess);
			})
			.error(function(storeUserError) {
				reject(storeUserError);
			});
		});
	};


	let getUser = (userId) => {
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
			.success(function(userObject) {
				let users = [];
				Object.keys(userObject).forEach(function(key) {
					users.push(userObject[key]);
				});
				resolve(users[0]);
				console.log("current user", users);
			})
			.error(function(error) {
				reject(error);
			});
		});
	};

	let getUserDetails = (userId) => {
		return $q((resolve, reject) => {
			$http.get(`${FIREBASE_CONFIG.databaseURL}/users/${userId}.json`)
			.success(function(userObject){
				resolve(userObject);
			})
			.error(function(error){
				reject(error);
			});
		});
	};

	let editUser = function(editedUserId, editUserInfo){
		return $q((resolve, reject)=> {
			$http.put(`${FIREBASE_CONFIG.databaseURL}/users/${editedUserId}.json`, 
				JSON.stringify({
					uid: editedUserId,
					dogname: editUserInfo.dogname,
					ownername: editUserInfo.ownername,
					phonenumber: editUserInfo.phonenumber,
					email: editUserInfo.email
				})
			).success(function(editResponse) {
				resolve(editResponse);
			}).error(function(editError) {
				reject(editError);
			});
		});
	};


	return{
		addUser:addUser,
		getUser:getUser,
		getUserDetails: getUserDetails,
		editUser: editUser
	};
});