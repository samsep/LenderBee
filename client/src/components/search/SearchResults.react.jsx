var React = require('react');
var Reflux = require('reflux');
var actions = require('../../actions/actions');
var searchStore = require('../../stores/searchStore');

var ResultDiv = React.createClass({
  proptypes: {
    itemName: React.PropTypes.string
  },

  render: function() {
    return (
      <div className="searchresultDiv">
      <a href={this.props.lender}>{this.props.itemName}</a>
      </div>
      )
  }
});

var searchResults = React.createClass({
 
 mixins: [Reflux.connect(searchStore)],

 searchInput: function() {
  console.log($('#searchBar').val());
 },
 
  handleSearch: function() {
    actions.searchSubmit();
  //TODO: Connect to DB and display items
 },

  render: function() {
    console.log('ITEMS FROM COMPONENT', this.state.items);
    var matchedItems = this.state.items.map(function(item) {return <ResultDiv itemName={item.title} />});
    return (
      <div>
      <h1>Results</h1>
    
      {matchedItems}
     
    </div>
    )
  }

});

module.exports = searchResults;
