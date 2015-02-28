var actions = require('../actions/actions.js');
var request = require('superagent');
var Reflux = require('reflux');
// var cloudinary = require('cloudinary');

var postItemStore = Reflux.createStore({
    listenables: [actions],
    data: {items: []},
    
    onPostFormSubmitted: function(title, description, price, photos) {
       // cloudinary.uploader.upload(photos, function(res) {
       // console.log('photos res', res);
       // })
      request
         .post('/api/items/1')
         .send({'title': title, 'description': description, 'beebucks': price, 'photos': photos})
         .end(function(err, res) {
            if(err) {
                console.log("error on post: ", err)
            }
            $('#itemPostTitle').val("")
            $('#itemPostDescription').val("")
            $('#itemPostPollenPrice').val("")
            $('#itemPostPhotos').val("")

           alert('Your item is now posted!');
         });
    }
});

module.exports = postItemStore;