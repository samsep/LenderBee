var actions = require('../actions/actions.js');
var request = require('superagent');
var Reflux = require('reflux');
var userStore = require('./user.js');
var api       = require('../utils/url-paths');
var makeUrl   = require('make-url');
// var cloudinary = require('cloudinary');

var postItemStore = Reflux.createStore({
    listenables: [actions],
    data: {items: []},
    
    onPostFormSubmitted: function(title, description, price, photos) {
       // cloudinary.uploader.upload(photos, function(res) {
       // console.log('photos res', res);
       // })
      var userId = userStore.getProp("id");
      request
         .post("/api/items/" + userId + "")
         .send({'title': title, 'description': description, 'beebucks': price, 'photos': photos})
         .end(function(err, res) {
            if(err) {
                console.log("error on post: ", err)
            }
            $('#itemPostTitle').val("");
            $('#itemPostDescription').val("");
            $('#itemPostPollenPrice').val("");
            $('#itemPostPhotos').val("");

           alert('Your item is now posted!');
         });
    }
});

module.exports = postItemStore;