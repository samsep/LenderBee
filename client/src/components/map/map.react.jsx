var React = require('react');
var Reflux = require('reflux');
var mapStore = require('../../stores/map');
var actions = require('./../../actions/actions');

var map = React.createClass({

	// [Note] These are hard-coded properties, but we need to get the lat/long from the current address
	// TODO: Figure out how to get lat-long from address or use address with maps api for centering
	mixins: [Reflux.connect(mapStore)],

  // [Tip] Invoked once immediately after initial rendering, has DOM rep with this.getDOMNode()
  componentDidMount: function() {
    // [Note] Define Map Options needed for rendering map
    var mapOptions = {center: new google.maps.LatLng(-34.397, 150.644), zoom: 13};
    var map = new google.maps.Map(this.getDOMNode(), mapOptions);
    
    // this.setState({map:map});
  },

  //   geoCodeItem: function () {
  //   geocoder.geocode({'address': address}, function(results, status) {
  //       console.log('from google maps', results);
  //       if (status == google.maps.GeocoderStatus.OK) {
  //         var marker = new google.maps.Marker({
  //             map: map,
  //             position: results[0].geometry.location
  //         });
  //         // this.setState({map:map});
  //       } else {
  //         console.log('Geocode was not successful for the following reason: ' + status);
  //       }
  //   });
  // }

  // this.props.items.forEach(function(item) {
  //   console.log(item);
  //   // console.log(""+ item.street + "" + ", " + item.city + ", " + item.state + ", " + item.country);
  //   // geoCodeItem(""+ item.street + "" + ", " + item.city + ", " + item.state + ", " + item.country);
  // });
    // var marker = new google.maps.Marker({position: this.mapCenterLatLng(), title: 'Hi', map: map});

    // [Note] Set the state after the component mounts (google maps api requires an active DOM node) 


  render: function() {
    return (
      <div className="map-container"/>
    )
  }
});

module.exports = map;