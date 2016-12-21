"use strict";

app.controller('SearchCtrl', function($scope, $location, $rootScope, GoogleApiFactory, FavoriteFactory) {


 $scope.lat = {};
    $scope.lng = {};
    $scope.loading = true;
    $scope.selectedPlace = {};
    $scope.myplaces = [];
    let options = {
        componentRestrictions: {
            country: "us"
        }
    };

    let inputFrom = document.getElementById('parkSearch');
    let autocompleteFrom = new google.maps.places.Autocomplete(inputFrom, options);
    google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
        let place = autocompleteFrom.getPlace();
        $scope.lat = place.geometry.location.lat();
        $scope.lng = place.geometry.location.lng();
        $scope.$apply();
        initialize();
    });

    function initialize() {
        $scope.markers = [];
        var openedInfoWindow = null;
        var bounds = new google.maps.LatLngBounds();
        var map;
        var query = "dog parks";
        var radius = 3000,

            center = new google.maps.LatLng($scope.lat, $scope.lng),
            mapOptions = {
                center: center,
                zoom: 12,
                scrollwheel: false
            };


        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        setMarkers(center, radius, map);

        function setMarkers(center, radius, map) {
            var service = new google.maps.places.PlacesService(map);
            service.textSearch({
                location: {
                    lat: $scope.lat,
                    lng: $scope.lng
                },
                radius: radius,
                query: query
            }, processResults);
            function processResults(results, status, pagination) {
                var locations;
                var locationJSON = [];
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    locations = results;
                }
                for (var i = 0; i < locations.length; i++) {
                    locationJSON.push({
                        "placeId": locations[i].place_id
                    });
                }
                $scope.$apply();
                for (var j = 0; j < locations.length; j++) {
                    var data = locationJSON[j];
                    createMarker(data, map);
                }
            }
        }

        function createMarker(data, map) {
            var service = new google.maps.places.PlacesService(map);
            service.getDetails({
                placeId: data.placeId
            }, function(result, status) {
                if (status != google.maps.places.PlacesServiceStatus.OK) {
                    return;
                }
                var marker = new google.maps.Marker({
                    map: map,
                    place: {
                        placeId: data.placeId,
                        location: result.geometry.location,
                    },
                    placeid: data.placeId,
                    title: result.name,
                    location: result.geometry.location,
                    address: result.formatted_address,
                    phone_number: result.formatted_phone_number,
                    website: result.website,
                    rating: result.rating,
                    reviews: result.reviews,
                    detailed_icon: result.icon,
                    types: result.types
                });
                infoBox(map, marker, data, result);
                $scope.markers.push(marker);
                $scope.$apply();
            });
        }

        function infoBox(map, marker, data, result) {
            var infoWindow = new google.maps.InfoWindow();

            google.maps.event.addListener(marker, "click", function(e) {

                infoWindow.setContent(data.content);
                infoWindow.open(map, marker);
            });

            (function(marker, data) {

                google.maps.event.addListener(marker, "click", function(e) {

                    infoWindow.setContent(result.name);
                    infoWindow.open(map, marker);
                });
            })(marker, data);
            $scope.$apply();
        }
    }

    $scope.addFavorite = function(dog) {
		dog.uid = $rootScope.user.uid;
		FavoriteFactory.postNewFav(dog).then(function(data) {
			$location.url('/search');
		});
	};

    $scope.viewLocation = function(selectedPlace) {
      $scope.selectedPlace = selectedPlace;
      console.log(selectedPlace);
    };

    initializeOriginalCoordinates();

    function initializeOriginalCoordinates () {
    navigator.geolocation.getCurrentPosition(function(position) {
              $scope.lat = position.coords.latitude;
              $scope.lng = position.coords.longitude;
              initialize();
    });
}






















 //   	$scope.lat = {};
 //    $scope.lng = {};
 //    $scope.markers = [];
 //    let options = {
 //        componentRestrictions: {
 //            country: "us"
 //        }
 //    };

	

   
 //    function initialize() {
 //        var pyrmont = new google.maps.LatLng(36.174465, -86.767960);
	// 	$scope.map = new google.maps.Map(document.getElementById('map'), {
	// 		center: pyrmont,
	// 		zoom: 12,
	// 		scrollwheel: false
	// });

	// var infowindow = new google.maps.InfoWindow();
 //    var service = new google.maps.places.PlacesService(map);
	

	// $scope.showDogPark = function() {
	// 	GoogleApiFactory.textSearch($scope.map, $scope.query).then(function(result) {
	// 	let markers;
	// 		for (var i = 0; i < result.length; i++) {  
	// 			markers = new google.maps.Marker({
	// 				position: result[i].geometry.location,
	// 				map: $scope.map,
	// 				icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
	// 			});
	// 			markers = result;
	// 		}

	// 	$scope.markers = result;
	// 	console.log("markers", markers);

	// 	});
		
	// };

 //    }
 //    initialize();

});
