'use strict'
var mongoose = require('mongoose');

var songSchema = mongoose.Schema({
    number: Number,
    userNote: String
});

module.exports = mongoose.model('song', songSchema);
