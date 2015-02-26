var React 	= require('react');
var Reflux 	= require('reflux');
var actions = require('../actions/actions');


var mapStore = Reflux.createStore({
	listenables: [actions],
	data: {items: [], map: {}},
	
	// TODO: The mapStore needs to hold the data to be used for the map
	// The addresses from the results search need to be set here for rendering
	// MVP + 1/2 also display tooltip with information about what is at that location
	// MVP + 1, clicking on a specific location in the map will highlight that item in the search view  	
	onMapMounted: function(map) {
		this.data.map = map;
	},

	onSearchResComplete: function(items) {
		this.data.items = items;
		this.trigger(this.data);
		var geocoder = new google.maps.Geocoder();
		
		var that = this;
		// onMapMounted: function(domMap) {
			this.data.items.forEach(function(item) {
				console.log('MAP ATM', that.data.map)
				var address = ""+ item.street + "" + ", " + item.city + ", " + item.state + ", " + item.country
				console.log('LADRESSE', address);
					geocoder.geocode({'address': address}, function(results, status) {
				    console.log('from google maps', results);
				    if (status == google.maps.GeocoderStatus.OK) {
				      var marker = new google.maps.Marker({
				          map: that.data.map,
				          position: results[0].geometry.location
				      });
				      that.trigger(that.data);
				      // this.setState({map:map});
				    } else {
				      console.log('Geocode was not successful for the following reason: ' + status);
				    }
					});
			});
		// }
	},

	getInitialState: function() {
		return this.data;
	}

});

module.exports = mapStore;