'use strict';

var Promise = require('bluebird');
var Songs = Promise.promisifyAll(require('../database/songs'));

exports.findAll = function() {
   return Songs.findAsync();
};

exports.findOneByQuery = function(query) {
   return Songs.findOneAsync(query);
};

exports.create = function(song) {
   return Songs.createAsync(song);
};

exports.update = function(id, objectToUpdate) {
   return Songs.findOneAndUpdateAsync({_id: id}, objectToUpdate, {new: true});
};

exports.remove = function(id) {
  return Songs.findOneAndRemoveAsync({_id:id} );
};

exports.search = function(ObjectToSearch) {
  return Songs.findAsync(ObjectToSearch)
}
