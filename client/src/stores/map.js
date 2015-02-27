var React 	= require('react');
var Reflux 	= require('reflux');
var actions = require('../actions/actions');
var request = require('superagent');


var mapStore = Reflux.createStore({
	listenables: [actions],
	data: {items: [], map: {}, markers: [], origAddress: {}},
	
	
	// TODO: The mapStore needs to hold the data to be used for the map
	// The addresses from the results search need to be set here for rendering
	// MVP + 1/2 also display tooltip with information about what is at that location
	// MVP + 1, clicking on a specific location in the map will highlight that item in the search view  	
	onMapMounted: function(map) {
		this.data.map = map;
		var that = this;
		var geocoder = new google.maps.Geocoder()

		request("/api/users/5", function(res) {
			if (res.err) {
				console.log('lerror', err);
			} else {
				var userData = JSON.parse(res.text);
				console.log('USERSDATA', userData);
				var address = ""+ userData.street + "" + ", " + userData.city + ", " + userData.state + ", " + userData.country
				geocoder.geocode({'address': address}, function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
					  that.data.map.setCenter(results[0].geometry.location);
					  that.trigger(that.data);
					} else {
						console.log("Geocode was not successful for the following reason: ",  status);
					}
				});
			}
		}); 
	},

	onSearchResComplete: function(items) {
		var that = this;

		var setAllMap = function (map) {
		if (that.data.markers.length > 0) {
			for (var i = 0; i < that.data.markers.length; i++) {
			   that.data.markers[i].setMap(map);
				}	
			}
		};
		setAllMap(null);
		this.data.markers = [];
		
		this.data.items = items;
		this.trigger(this.data);
		var geocoder = new google.maps.Geocoder();
		
		// onMapMounted: function(domMap) {
			this.data.items.forEach(function(item) {
				var address = ""+ item.street + "" + ", " + item.city + ", " + item.state + ", " + item.country
					geocoder.geocode({'address': address}, function(results, status) {
				    if (status == google.maps.GeocoderStatus.OK) {
				      var marker = new google.maps.Marker({
				          map: that.data.map,
				          position: results[0].geometry.location
				      });
				      that.data.markers.push(marker);
				      that.trigger(that.data);
				      // this.setState({map:map});
				    } else {
				      console.log('Geocode was not successful for the following reason: ' + status);
				    }
					});
					
			setAllMap(that.data.map);
			});
		// }
	},

	getInitialState: function() {
		return this.data;
	}

});

module.exports = mapStore;