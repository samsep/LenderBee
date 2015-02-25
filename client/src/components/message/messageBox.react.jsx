var React = require('react');
var Reflux = require('reflux');
var messagingStore = require('./../../stores/messagingStore.js');
var actions = require('./../../actions/actions.js');

var MessageBox = React.createClass({
  //listens to messagingStore
  mixins: [Reflux.connect(messagingStore)],

  handleSubmit: function(e) {
    e.preventDefault();
    actions.messageFormSubmitted($('#messageBoxText').val(), this.props.to);
  },

  render: function(){
    //creates component for each message and loads them into the array messageGroup
    var url = "/api/messages/samin"+ "/" + this.props.to + ""
    return (
    <form className="messageBox" onSubmit={this.handleSubmit}>
      <div className="form-group">
        <label for="itemName">Send a Message</label>
        <textarea className="form-control" id="messageBoxText" rows="3" placeholder="Send a Message..." name="message"></textarea>
      </div>
      <button type="submit" className="btn btn-warning" onClick={this.handleSubmit}>Submit</button>
      </form>
    )
  }
});

module.exports = MessageBox;

