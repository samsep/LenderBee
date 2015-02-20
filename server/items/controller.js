// var Item = require('./models.js');
var db = require('../db/db.js');
var User = global.db.User;
var Item = global.db.Item;
var Message = global.db.Message;
var controller = {};

controller.create = function(req, res, next){

	//extract the user name
	//query the user database to get id
	//set the lender_id of the item to the user id
	// console.log(req.params); //extract the username from the url
	User.find({ //find the user id of the currently logged in user
		where: {
			username: req.params.user
		}
	}).then(function(user){
		//extract user_id, city_id, state_id, and country_id from user
		console.log('USER ID ', user.id);
		req.body.lender_id = user.id
		Item.create(req.body)
			.then(function(item){
				res.json(item);
			})
			.catch(function(error){
				('inside error of items create controller ', error);
			})
	}).catch(function(error){
		('inside error of items create controller ', error);
	})
}

controller.getAll = function(req, res, next){
	var query = req.params.title;
	console.log('title from user search', req.param.title);
	Item.findAll({
		where: {
			title: query
		}
	})
		.then(function(items){
			res.json(items);
		})
		.catch(function(error){
			console.log(error);
		})
}

controller.getOneByUser = function(req, res, next){
	//extract the user name
	User.find({ //find the user id of the currently logged in user
		where: {
			username: req.params.user //extract the username from the url
		}
	})
		.then(function(user){ //use the user's id to find associated items in the items table
			Item.findAll({
				where: { //where the user id is associated with an items lender or borrower id
						lender_id: user.id //this id call may not be allowed, will have to test
						// borrower_id: user.id
					}
				})
				.then(function(items){
					res.json(items); //after we find the items, return them back to the client
				})//the client can sort out based on lent or borrowed
		})
		.catch(function(error){
			console.log('items read error ', error);
		})

module.exports = controller;
