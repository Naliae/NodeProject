var express = require('express');
var router = express.Router();
var _ = require('lodash');
var passport = require('passport');
var authenticate = require('../services/authentication');

router.get('/', function(req, res) {
 if (req.accepts('text/html')) {
 res.render('login');
 }
 else {
 res.send(406, {err: 'Not valid type for asked ressource'});
 }
});
router.post('/', passport.authenticate('local', {
 successRedirect: '/songs',
 failureRedirect: '/login'
 })
);
module.exports = router;
