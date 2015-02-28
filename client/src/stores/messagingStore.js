var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');
var actions = require('../actions/actions.js');
var userStore = require('../stores/user.js');
var api       = require('../utils/url-paths');
var makeUrl   = require('make-url');
var userId = userStore.getProp("id");

var messagingStore = Reflux.createStore({

  data: {messages: [], lenderId: null, userId: userStore.getProp("id")},

  //listens to actions
  listenables: [actions],

  onLenderMessaged: function(lenderId) {
    this.data.lenderId = lenderId;
    this.trigger(this.data);
    var that = this;
    request("/api/messages/" + userId, function(res) {
      that.data.messages = JSON.parse(res.text).filter(function(message) { 
        return ((message.to_id === userId || message.from_id === userId) && (message.from_id === lenderId || message.to_id === lenderId)) 
        })
        that.trigger(that.data);
    });
  },

  onMessageFormSubmitted: function(message, recipient) {
    var that = this;
      request
            .post("/api/messages/"+ userId + "/" + recipient + "")
            .send({'message': message})
            .end(function(err, res) {
              if (err) {
                console.log("send message error", err);
              }
              else {
                $('#messageBoxText').val("");
                console.log('Your message was sent!');
                actions.lenderMessaged(null, recipient);
              }

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
