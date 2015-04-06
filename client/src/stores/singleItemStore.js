var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');
var actions = require('../actions/actions.js');
var userStore   = require('./user.js');



var singleItemStore = Reflux.createStore({

  data: {item: {}, lender: {}},

  //listens to actions
  listenables: [actions],

  onSelectItem: function(item, lender) {
   this.data.item = item;
   this.data.lender= lender;
   this.trigger(this.data);
   
  }, 

  onItemRequestSubmitted: function(itemId, userId) {
    //request DB to notify other user;
    request.post("/api/notifications/" + "" + itemId + "/" + userId + "", function(res) {
      if (res.ok) {
        $('#successMessage').addClass("success");
        console.log('Request sent for item')
      } else {
        console.log('error!')
      }
    })
  },


  //sets the state to the item data
  getInitialState: function(){
    return this.data;
  }

})

module.exports = singleItemStore;