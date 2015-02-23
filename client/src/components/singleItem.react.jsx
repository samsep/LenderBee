var React = require('react');
var Reflux = require('reflux');
var singleItemStore = require('../stores/singleItemStore.js');
var actions = require('../actions/actions.js');

var singleItem = React.createClass({

  //listens to singleItemStore
  mixins: [Reflux.connect(singleItemStore)],

  handleItemRequest: function() {
    actions.itemRequestSubmitted();
  },

  render: function(){
    return (
      <div>
        <img src="#" href="#" alt="item"/>
        <p>{this.state.itemName}</p>
        <p>{this.state.itemDescription}</p>
        <button name="messageOwner" onClick={this.handleItemRequest}>Request Item</button>
        <img src="#" href="#" alt="owner"/>
        <p>{this.state.ownerName}</p>
        <p>{this.state.ownerRating}</p>
      </div>
    )
  }
});

module.exports = singleItem;
