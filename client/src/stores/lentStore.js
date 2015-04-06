var actions = require('../actions/actions');
var request = require('superagent');
var Reflux = require('reflux');

var lentStore = Reflux.createStore({
    listenables: [actions],
    data: {items: []},

    onBorrowedItemReturned: function() {
      // var that = this;
      console.log('item returned');
    },
    
    onRequestLentPage: function() {
      var that = this;
        request("/api/items/:user", function(res){
          //TODO: Endpoint will query DB for user
          that.data.items = JSON.parse(res.text);
          console.log('LENT ITEMS', that.data.items)
          that.trigger(that.items);
        })
      },

    getInitialState: function() {
        return this.data;
    }
});

module.exports = lentStore;