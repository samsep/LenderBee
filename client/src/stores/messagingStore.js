var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');
var actions = require('../actions/actions.js');

var messagingStore = Reflux.createStore({

  data: {messages: []},

  //listens to actions
  listenables: [actions],

  lender_id: null,


  onLenderMessaged: function(lenderId) {
//TODO: CREATE FIRST MESSAGE HERE, GRAB FORM. NAME FORM FIELD = MESSAGE;
    // request.post("/api/messages/samin" + "" + lenderId + "", function(res) {
    //   console.log('MESSAGES RECIEVED', res);
    // });
    var that = this;
    that.lender_id = lenderId;
    request("/api/messages/samin/" + "" + lenderId + "", function(res) {
      console.log('MESSAGES RECIEVED', res);
      that.data.messages = JSON.parse(res.text).filter(function(message) {
        return message.lender_id = lenderId;
      })
    });
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
