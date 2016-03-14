var express = require('express');
var router = express.Router();
var UserService = require('../services/users');
var NoteService = require('../services/notes');
var SongService = require('../services/songs');

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.accepts('text/html')  || req.accepts('application/json'))  {
      UserService.find(req.query)
          .then(function(users){
            SongService.getTop5SongsByNotes()
                .then(function(notes) {
                    if (req.accepts('text/html')) {
                      console.log(notes);
                        return res.render('index', {notes: notes, users: users});
                    }
                    if (req.accepts('application/json')) {
                        res.status(200).send(notes);
                    }
                })
            ;
          })
      ;
  }
  else {
      res.status(406).send({err: 'Not valid type for asked ressource'});
  }
});

router.get('/', function(req, res) {
    if (req.accepts('text/html') || req.accepts('application/json')) {

    }
    else {
        res.status(406).send({err: 'Not valid type for asked ressource'});
    }
});


module.exports = router;
