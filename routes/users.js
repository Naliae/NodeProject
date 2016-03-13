var express = require('express');
var router = express.Router();
var UserService = require('../services/users');


/* GET users listing. */
router.get('/', function(req, res) {
  if (req.accepts('text/html')  || req.accepts('application/json'))  {
      UserService.find(req.query)
          .then(function(users){
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

router.get('/:id', function(req, res) {
    if (req.accepts('text/html') || req.accepts('application/json')) {
        UserService.findOneByQuery({_id: req.params.id})
            .then(function(user) {
                if (!user) {
                    res.status(404).send({err: 'No user found with id' + req.params.id});
                    return;
                }
                if (req.accepts('text/html')) {
                    return res.render('user', {user: user});
                }
                if (req.accepts('application/json')) {
                    return res.send(200, user);
                }
            })
            .catch(function(err) {
                console.log(err);
                res.status(500).send(err);
            })
        ;
    }
    else {
        res.status(406).send({err: 'Not valid type for asked ressource'});
    }
});


module.exports = router;
