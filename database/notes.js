'use strict'
var mongoose = require('mongoose');
​
var noteSchema = mongoose.Schema({
    note: {type: Number, required: true},
    song: {type: mongoose.Schema.Types.ObjectId, required: true},
    username: {type: String, required: true},
});
​
module.exports = mongoose.model('note', noteSchema);
