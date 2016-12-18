"use strict";

app.controller("NavCtrl", function($scope){
	$scope.navItems = [
		{
			name:"Search",
			url:"#/search"
		},
		{
			name: "Favorites",
			url: "#/profile"
		},
		{
			name:"Logout",
			url:"#/logout"
		}
	];
});