'use strict'
var Promise = require('bluebird');
var _ = require('lodash');
var Users = Promise.promisifyAll(require('../database/users'));

exports.find = function(query) {
    return Users.findAsync(query);
};

exports.findOneByQuery = function(query) {
    return Users.findOneAsync(query);
};

exports.createUser = function(user) {
    return Users.createAsync(user);
};

exports.getLast5Users = function(user) {
  var createdUsers = [];
  return Users.aggregateAsync([
    {$group: {_id:"$_id", avgCreatedAt: {$avg:"$createdAt"}}},
    {$sort : {avgCreatedAt: -1}},
    {$limit : 3}
  ])
    .then(function(users){
      var ids=_.map(users, '_id');
      createdUsers = users;
      console.log(createdUsers);
      return Users.find({_id: {$in:ids}});
    })
    .then(function(users){
      return _.map(createdUsers,function(n){
      var user=_.clone(n);
      user.users=_.find(users,{_id: n._id});
      console.log(user);
      return user;
      });
    })
  ;
};
