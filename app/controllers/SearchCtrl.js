"use strict";

app.controller('SearchCtrl', function($scope, $location, $rootScope, FavoriteFactory) {
 	$scope.lat = {};
    $scope.lng = {};
    $scope.selectedPlace = {};
    let options = {
        componentRestrictions: {
            country: "us"
        }
    };

    // modal init
	$('.modal').modal();

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
        var radius = 1000,

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
                query: "dog parks"
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
                var locPhoto;
                if (result.photos !== undefined) {
                    locPhoto = result.photos[0].getUrl({
                        'maxWidth': 300,
                        'maxHeight': 175
                    });
                } else {
                    locPhoto = "http://www.freeiconspng.com/uploads/no-image-icon-15.png";
                }
                var marker = new google.maps.Marker({
                    map: map,
                    place: {
                        placeId: data.placeId,
                        location: result.geometry.location,
                    },
                    placeid: data.placeId,
                    photo: locPhoto,
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
		var infoGeoWindow = new google.maps.InfoWindow({map: map});
		if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
		var pos = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};
			infoGeoWindow.setPosition(pos);
			infoGeoWindow.setContent("You Are Here");
			map.setCenter(pos);
		}, function() {
			handleLocationError(true, infoGeoWindow, map.getCenter());
			});
		} else {
			// Browser doesn't support Geolocation
			handleLocationError(false, infoGeoWindow, map.getCenter());
		}

	}

	function handleLocationError(browserHasGeolocation, infoWindow, pos) {
		infoWindow.setPosition(pos);
		infoWindow.setContent(browserHasGeolocation ?
		'Error: The Geolocation service failed.' :
		'Error: Your browser doesn\'t support geolocation.');
	}

    $scope.addFavorite = function(dog) {
		dog.uid = $rootScope.user.uid;
		FavoriteFactory.postNewFav(dog).then(function(data) {
			alertify.success('Added To Favorites!');
			$location.url('/search');
		});
	};

    $scope.viewLocation = function(selectedPlace) {
		$scope.selectedPlace = selectedPlace;
    };

    initializeOriginalCoordinates();

    function initializeOriginalCoordinates () {
    	navigator.geolocation.getCurrentPosition(function(position) {
			$scope.lat = position.coords.latitude;
			$scope.lng = position.coords.longitude;
			initialize();
    });
}
});