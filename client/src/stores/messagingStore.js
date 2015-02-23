var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');
var actions = require('../actions/actions.js');

var messagingStore = Reflux.createStore({

  data: {messages: [{person:"bob",message:"hi"},{person:"larry",message:"yo"},{person:"bob",message:"gimme everything"}]},

  //listens to actions
  listenables: [actions],


  onLenderMessaged: function(lenderId) {
    request("/api/messages/samin/" + "" + lenderId)
  },

  //gets the item info from the database and sets the data to the item info
  init: function(){
   //  request.get("/api/items/:user", function(res){
   //    console.log(res.body);
   //    this.data.item = res.body;
   //    this.trigger(this.data);
   // })
  },

  //sets the state to the item data
  getInitialState: function(){
    return this.data;
  }

})

module.exports = messagingStore;
