var Router 	= require('react-router');
var APP    	= require('../components/app.jsx');
var Profile = require('../components/profile/profile.jsx');
var searchResults = require('../components/search/searchResults.jsx');
var Route  	= Router.Route;

var routes = (
  <Route name="search" path="/" handler={APP}>
  	<Route name="profile" path="/user/user_id/profile" handler={Profile}/>
    <Route name="searchResults" path="/user/user_id/searchResults" handler={SearchResults}/>
  </Route>
);

module.exports = routes;
