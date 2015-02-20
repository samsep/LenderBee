var React = require('react');
var Reflux = require('reflux');
var actions = require('../../actions/actions');
var searchStore = require('../../stores/searchStore');

var searchResults = React.createClass({
 
 mixins: [Reflux.connect(searchStore)],

 ResultDiv: React.createClass({
  render: function() {
    return (
      <div>
      //make request w/ item name??
      <a href='#'>{this.props.itemName}</a>
      <img src="#"/>
      </div>)
  }
 })
 
 searchInput: function() {
  console.log($('#searchBar').val());
 },
 
 
  handleSearch: function() {
    actions.searchSubmit();
  //TODO: Connect to DB and display items
 },

  render: function() {
    var matchedItems = this.state.items.filter(function(item){
      return item.name === $('#searchBar').val();
    })
      .map(function(item) {return <ResultDiv>itemName={item.name} itemImage={item.image}});

    return (
      <div>
        {matchedItems}
      </div>
    )
  }

});

module.exports = searchResults;

