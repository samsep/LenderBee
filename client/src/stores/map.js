var React 	= require('react');
var Reflux 	= require('reflux');
var actions = require('../actions/actions');
var request = require('superagent');
var Router = require('react-router');
var userStore   = require('./user.js');
var ResultsMap = require('../components/map/resultsMap.react.jsx');
var Link = Router.Link;


// var InfoContent = require('../components/map/infoContent.react.jsx');

var mapStore = Reflux.createStore({
	mixins: [Router.Navigation],
	listenables: [actions],
	data: {items: [], map: {}, markers: [], origAddress: {}},
	 	
	onMapMounted: function(map) {
		this.data.map = map;
		var that = this;
		var geocoder = new google.maps.Geocoder()

		var userId = userStore.getProp("id");
		//hard-coded user-ID to 1 currently
		request.get("/api/users/"+userId, function(res) {
			if (res.err) {
				console.log('error', err);
			} else {
				var userData = JSON.parse(res.text);
				console.log('THE USERS DATA', userData);
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
			     
			      var link = '<a href="#/singleItem" id="infoClick">'+item.title+'</a>'
			      // var contentString = "" + link + ": " + item.description + " Price: " + item.beebucks + "" + "Lender: " + item.lender.username + "Lender Rating: " + item.lender.rating + ""
			      var contentString = '<div>' + '<div>'+ link +'</div>'+'<div class="infoDescription">'+'<i class="fa fa-quote-left"></i>' + " " + item.description+ '<div class="itemBeebucks">' +'<i class="fa fa-money"></i>'+ " " + item.beebucks+'</div>' + '</div>'+'<div className="lenderInfoWindow">'+'<i class="fa fa-user"></i>' +item.lender.username + '</div>'+'<div>' + '<i class="fa fa-star"></i>' + item.lender.rating + '</div>' + '</div>'
			 
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

			      google.maps.event.addDomListener(infowindow, 'domready', function() {
			          $('#infoClick').click(function() {
			              actions.selectItem(item, item.lender);
			          });
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