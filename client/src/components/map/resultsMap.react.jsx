var React = require('react');
var Reflux = require('reflux');
var mapStore = require('../../stores/map');
var actions = require('./../../actions/actions');
var SearchBar = require('../search/SearchBar.react.jsx');
var Map = require('./map.react.jsx');
var SearchBar = require('../search/SearchBar.react.jsx')

var resultsMap = React.createClass({

  mixins: [Reflux.connect(mapStore)],


  componentDidMount: function() {
  },

  render: function() {

    return (
      <div>
      <Map />
      </div>
    )
  }
});

module.exports = resultsMap;