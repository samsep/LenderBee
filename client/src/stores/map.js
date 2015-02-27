var React 	= require('react');
var Reflux 	= require('reflux');
var actions = require('../actions/actions');
var request = require('superagent');
var Router = require('react-router')
var ResultsMap = require('../components/search/SingleItem.react.jsx');
var Link = Router.Link;
// var InfoContent = require('../components/map/infoContent.react.jsx');

var mapStore = Reflux.createStore({
	mixins: [Router.Navigation],
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

				      var name = item.title;
				      var link = '<a href="#/singleItem" onclick="actions.selectItem(item.name, item.id, item.pollenprice, item.description)">'+item.title+'</a>'
				      var contentString = "" + link + ": " + item.description + " Price: " + item.pollenprice + ""

				      var infowindow = new google.maps.InfoWindow({
		            content: contentString,
		            maxWidth: 200
				      });


				      google.maps.event.addListener(marker, 'mouseover', function() {
				         infowindow.open(that.data.map,marker);
				       });

				      google.maps.event.addListener(that.data.map, 'mousemove', function() {
				         infowindow.close();
				       });

				      google.maps.event.addListener(infowindow, 'click', function() {
				      		console.log('INFO WINDOW CLICKED')
				         // actions.selectItem(item.name, item.id, item.pollenprice, item.description);
				         // ResultsMap.transitionTo('SingleItem');
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