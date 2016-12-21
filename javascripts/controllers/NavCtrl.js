"use strict";

app.controller("NavCtrl", function($scope){
	$scope.navItems = [
		{
			name:"Search",
			url:"#/search"
		},
		{
			name: "Favorites",
			url: "#/favorite"
		},
		{
			name:"Logout",
			url:"#/logout"
		},
		{	name:"Friends",
			url:"#/contacts"
		}		
	];
});