"use strict";

app.controller("NavCtrl", function($scope){
	$scope.navItems = [
		{
			name:"Logout",
			url:"#/logout"
		},
		{
			name:"Search",
			url:"#/search"
		},
		{
			name: "Favorites",
			url: "#/favorite"
		},
		{	name:"Friends",
			url:"#/contacts"
		}		
	];
});