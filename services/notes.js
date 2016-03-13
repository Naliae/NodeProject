'use strict'
var Promise = require('bluebird');
var Notes = Promise.promisifyAll(require('../database/notes'));

exports.find = function(query) {
    return Notes.findAsync(query);
};

exports.findOneByQuery = function(query) {
    return Notes.findOneAsync(query);
};

exports.create = function(note) {
    return Notes.createAsync(note);
};

exports.deleteAll = function() {
    return Notes.removeAsync();
};

exports.updateNoteById = function(noteId, noteToUpdate) {
    return Notes.findOneAndUpdateAsync({_id: noteId}, noteToUpdate, {new: true}); // https://github.com/Automattic/mongoose/issues/2756
};

exports.search = function(ObjectToSearch) {
  return Notes.findAsync(ObjectToSearch)
}
