var express = require('express');
var router = express.Router();
var UserService = require('../services/users');


/* GET users listing. */
router.get('/', function(req, res) {
  if (req.accepts('text/html')  || req.accepts('application/json'))  {
      UserService.find(req.query || {})
          .then(function(users) {
              if (req.accepts('text/html')) {
                  return res.render('users', {users: users});
              }
              if (req.accepts('application/json')) {
                  res.status(200).send(songs);
              }
          })
      ;
  }
  else {
      res.status(406).send({err: 'Not valid type for asked ressource'});
  }
});


module.exports = router;
