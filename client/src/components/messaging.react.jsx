var React = require('react');
var Reflux = require('reflux');
var messagingStore = require('../stores/messagingStore.js');
var Message = require('./message.react.jsx');
var actions = require('../actions/actions.js');

var Messaging = React.createClass({

  //listens to messagingStore
  mixins: [Reflux.connect(messagingStore)],

  render: function(){
    //creates component for each message and loads them into the array messageGroup
    var messageGroup = this.state.messages.map(function(singleMessage) {
      return (<div><Message messageInfo={singleMessage.message} lender={lender_id} /></div>);
    });
    return (
      <div>
        <p>Messaging userName</p>
        <div className="messageWindow">
          <ul>
            {messageGroup}
          </ul>
        </div>
        <textarea rows="2" className="form-control" placeholder="Message..." id="searchBar"></textarea>
        <span className="input-group-btn">
          <button className="btn btn-warning" type="submit" onClick={this.handleSubmit}>submit message</button>
        </span>
      </div>
    )
  }
});

module.exports = Messaging;
