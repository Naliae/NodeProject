var express = require('express');
var router = express.Router();
var UserService = require('../services/users');
var NoteService = require('../services/notes');
var SongService = require('../services/songs');

/* GET search users listing. */
router.get('/users', function(req, res) {
  var inputSearch = req.query.inputSearch;
  var selectSearch = req.query.selectSearch;
  var query = {};
  query[selectSearch] = inputSearch;
  UserService.search(query)
    .then(function(users) {
      if (!users) {
          res.status(404).send({err: 'No user found.'});
          return;
      }
      res.status(200).render('users', {users: users});
    });
});

/* GET users listing. */
router.get('/', function(req, res) {
  if (req.accepts('text/html')  || req.accepts('application/json'))  {
      UserService.findAll(req.query)
          .then(function(users){
              if (req.accepts('text/html')) {
                  return res.render('users', {users: users});
              }
              if (req.accepts('application/json')) {
                  res.status(200).send(users);
              }
          })
      ;
  }
  else {
      res.status(406).send({err: 'Not valid type for asked ressource'});
  }
});

/* GET user account. */
router.get('/me', function(req, res) {
  if (req.accepts('text/html') || req.accepts('application/json')) {
      UserService.findOneByQuery({_id: req.user._id})
          .then(function(user) {
              if (!user) {
                  res.status(404).send({err: 'No user found with id ' + req.user.id});
                  return;
              }
              if (req.accepts('text/html')) {
                  console.log(user);
                  return res.render('account', {user: user});
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

/* GET user. */
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
