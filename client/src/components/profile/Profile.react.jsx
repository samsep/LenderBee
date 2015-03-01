var React         = require('react');
var Reflux        = require('reflux');
var profileStore  = require('../../stores/profileStore.js');
var actions       = require('../../actions/actions.js');
var Review        = require('../review/singleReview.react.jsx');
var UserStats     = require('./UserStats.jsx');

var Router        = require('react-router');
var Link          = Router.Link;

var Profile = React.createClass({

  // [Note] Whenever anything is triggered from profileStore, this.state will be set to state
  mixins: [Reflux.connect(profileStore, "data")],

  componentWillMount: function() {
    if(!this.state.data.reviews) { // if there are no reviews on this components state property
      actions.fetchReviews(); // fetch the reviews from reviewStore
    }
  },

  render: function(){
    var allReviews;
    if(this.state.data.reviews){
      //creates component for each review and loads them into the array reviewGroup
      allReviews = this.state.data.reviews.map(function(review) {
        // console.log('review', review);
        return (<Review review={review} />);
      });
    }
    return (
      <div>
        <UserStats data={this.state.data}/>
        {/*<Link to="reviews">Reviews</Link>*/}
        {/* add rating component here */}
        {/* add amazonish rating graph - see dailyjs for react d3 plugin */}
        {allReviews}
      </div>
    )
  }
});

module.exports = Profile;