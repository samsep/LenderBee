var actions = require('../actions/actions');
var request = require('superagent');
var Reflux = require('reflux');

var searchStore = Reflux.createStore({
    listenables: [actions],
    data: {items: [], searched: null},
    
    init: function() {
      // this.data.searched = $('#searchBar').val();
      
      },

    onSearchSubmit: function(searchedVal) {
        var that = this;
                request("/api/items/city/samin/" + "" + searchedVal + "", function(res){
                  // that.data.items = res;
                  that.data.items = JSON.parse(res.text);
                  that.trigger(that.data);
                  actions.searchResComplete(that.data.items);
                  });
    },

    getInitialState: function() {
        return this.data;
    }
});

module.exports = searchStore;