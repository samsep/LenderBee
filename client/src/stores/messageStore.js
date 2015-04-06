var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');
var actions = require('../actions/actions.js');

var messageStore = Reflux.createStore({

  data: {item: {userName: "Bob", userRating: 0, about: "I am the best"}},

  propTypes: {
    messageInfo: React.PropTypes.object
  },

  //listens to actions
  listenables: [actions],

  //gets the item info from the database and sets the data to the item info
  init: function(){
  },

  //sets the state to the item data
  getInitialState: function(){
    return this.data.item;
  }

})

module.exports = messageStore;
