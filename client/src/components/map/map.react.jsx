var React = require('react');
var Reflux = require('reflux');
var mapStore = require('../../stores/map');
var actions = require('./../../actions/actions');
var SearchBar = require('../search/SearchBar.react.jsx')

var map = React.createClass({

	// [Note] These are hard-coded properties, but we need to get the lat/long from the current address
	// TODO: Figure out how to get lat-long from address or use address with maps api for centering
	mixins: [Reflux.connect(mapStore)],

  // [Tip] Invoked once immediately after initial rendering, has DOM rep with this.getDOMNode()
  componentDidMount: function() {
      $(".carousel").remove();
      var mapOptions = {center: new google.maps.LatLng(37.7836245,-122.4089988), zoom: 13};
      var gMap = new google.maps.Map(this.getDOMNode(), mapOptions);
      actions.mapMounted(gMap);
  },


  render: function() {
    return (
      <div className="map-container"/>
    )
  }
});

module.exports = map;