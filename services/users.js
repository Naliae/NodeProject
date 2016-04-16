'use strict'
var Promise = require('bluebird');
var Users = Promise.promisifyAll(require('../database/users'));

exports.find = function() {
    return Users.find().sort({createdAt:-1}).limit(3);
    // J'aurais changé le nom de la fonction, findUsersForHome, ou qqch comme ça, find laisse penser que tu peux
    //l'utilser n'importe où dans le code, sauf qu'ici on aura toujours que les 3 derniers users.
};

exports.findAll = function() {
    return Users.findAsync();
};

exports.findOneByQuery = function(query) {
    return Users.findOneAsync(query);
};

exports.createUser = function(user) {
    return Users.createAsync(user);
};

exports.search = function(ObjectToSearch) {
  return Users.findAsync(ObjectToSearch)
}

exports.addFavoritesToUser = function(userId, songId) {
    return Users.findOneAndUpdateAsync(
        {_id: userId},
        {$push: {favoriteSongs: songId}},
        {new: true}
    );
};
exports.deleteFavoritesToUser = function(userId, songId) {
    return Users.findOneAndUpdateAsync(
        {_id: userId},
        {$pop: {favoriteSongs: songId}},
        {new: true}
    );
}

exports.deleteAllFavoritesToUser = function(userId) {
   return Users.findOneAndUpdateAsync(
       {_id: userId},
       {favoriteSongs: []},
       {new: true}
   );
};
