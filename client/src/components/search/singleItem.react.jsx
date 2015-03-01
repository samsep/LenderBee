var React = require('react');
var Reflux = require('reflux');
var singleItemStore = require('./../../stores/singleItemStore.js');
var actions = require('./../../actions/actions.js');
var Messaging = require('../message/messaging.react.jsx');
var userStore   = require('./../../stores/user.js');
var Router = require('react-router');

var singleItem = React.createClass({
  //listens to singleItemStore
  mixins: [Reflux.connect(singleItemStore), Router.Navigation],

  componentDidMount: function() {
  },

  handleItemRequest: function() {
    var userId = userStore.getProp('id');
    actions.itemRequestSubmitted(this.state.item.id, userId);
  },

  handleMessageLender: function() {
    actions.lenderMessaged(this.state.lender.id);
     this.transitionTo('Messaging')
  },

  render: function(){
    return (
      <div>
        <img src="#" href="#" alt="item"/>
        <p>Item: {this.state.item.title}</p>
        <p>Description: {this.state.item.description}</p>
        <p>BeeBucks: {this.state.item.beebucks}</p>
        <span>Lender: {this.state.lender.username+ " "}</span>
        <img src={this.state.lender.fbpicture}/>
        <button name="messageLender" onClick={this.handleMessageLender}>Message Lender</button>
        <button name="requestItem" onClick={this.handleItemRequest}>Request Item</button>
      </div>
    )
  }
});

module.exports = singleItem;
