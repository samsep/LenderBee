var React = require('react');
var Reflux = require('reflux');
var actions = require('../../actions/actions');
var searchStore = require('../../stores/searchStore');
var SingleItem = require('./singleItem.react.jsx');
var SearchBar = require('./SearchBar.react.jsx');
var Router = require('react-router');
var Link = Router.Link;

var ResultDiv = React.createClass({

  mixins: [Router.Navigation],

  handleClick: function() {
   actions.selectItem(this.props.item, this.props.lender);
  },
  
  render: function() {
    return (
      <div className="item">
          <div className="ui tiny image">
            <Link to="SingleItem" onClick={this.handleClick}>
              <img src={this.props.itemimg} />
            </Link>
          </div>
          <div className="middle aligned content">
            <span onClick={this.handleClick}>{this.props.itemName}</span>
                 <div><i className="tiny quote left icon"/><span>{"   " + this.props.item.description}</span></div>
                 <div><i className="tiny money icon"></i><span>{"   " + this.props.item.beebucks}</span></div>
                 <div><i className="tiny user icon"/><span>{"   " + this.props.item.lender.username}</span></div>
                 <div><i className="tiny star icon"/><span>{"   " + this.props.item.lender.rating}</span></div>
          </div>
        </div>
      )
  }
});

var searchResults = React.createClass({
 
 mixins: [Reflux.connect(searchStore)],

  handleSearch: function() {
    actions.searchSubmit();
 },

  render: function() {
    var matchedItems = this.state.items.map(function(item) {
      return (<ResultDiv item={item} itemName={item.title} itemimg={item.imageurl} lender={item.lender} />)
    });
    return (
      <div className="searchResultsList">
        <div className="ui divided items">
            {matchedItems}
        </div>
      </div>
    )
  }

});

module.exports = searchResults;
