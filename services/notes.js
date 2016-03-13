'use strict'
var Promise = require('bluebird');
var Notes = Promise.promisifyAll(require('../database/notes'));

exports.getNotes = function() {
    return Notes;
}

exports.findOneByQuery = function(query) {
    return Notes.findOneAsync(query);
};

exports.create = function(notes) {
    return Notes.createAsync(notes);
};

exports.updateNoteById = function(noteId, noteToUpdate) {
    return Notes.findOneAndUpdateAsync({_id: noteId}, noteToUpdate, {new: true}); // https://github.com/Automattic/mongoose/issues/2756
};

exports.search = function(ObjectToSearch) {
  return Notes.findAsync(ObjectToSearch)
}
