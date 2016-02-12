var express = require('express');
var router = express.Router();
var SongService = require('../services/songs');
var _ = require('lodash');

router.get('/', function(req, res) {
if (req.accepts('text/html') || req.accepts('application/json')) {
  SongService.findAll()
   .then(function(songs) {
     if(!songs){
     res.status(404).send({err: 'Error'});
     return;
     }
     if (req.accepts('text/html')) {
     return res.render('songs', {songs: songs});
     }
     if (req.accepts('application/json')) {
     return res.status(200).send(songs);
     }
   });
}
else {
res.status(406).send({err: 'Not valid type for asked ressource'});
}
});

router.get('/add', function(req, res) {
 if (req.accepts('text/html') || req.accepts('application/json')) {
   SongService.findAll()
    .then(function(form) {
      if(!form){
      res.status(404).send({err: 'Error'});
      return;
      }
      if (req.accepts('text/html')) {
      return res.render('form', {form: form});
      }
      if (req.accepts('application/json')) {
      return res.status(200).send(form);
      }
    });
 }
 else {
 res.status(406).send({err: 'Not valid type for asked ressource'});
 }
});

router.get('/:id', function(req, res) {
 if (req.accepts('text/html') || req.accepts('application/json')) {
   SongService.findOneByQuery({_id: req.params.id})
   .then(function(song) {
     if (!song) {
       res.status(404).send({err: 'No song found with id' + req.params.id});
       return;
     }
     if (req.accepts('text/html')) {
       return res.render('song', {song: song});
     }
     if (req.accepts('application/json')) {
       return res.status(200).send(song);
     }
   });
 }
  else {
   res.status(406).send({err: 'Not valid type for asked ressource'});
 }
});

router.get('/songs', function(req, res) {
  SongService.search(req.query || {})
    .then(function(songs) {
      res.status(200).send(songs);
    });
});

router.post('/', function(req, res) {
 if (!_.has(req.body, 'title') || !_.has(req.body, 'album') || !_.has(req.body, 'artist')) {
   return res.status(400).send('title, album and artist are mandatory');
 }
 SongService.create(req.body)
   .then(function(resultat){
     if (req.accepts('text/html')) {
       return res.redirect('/songs/' + resultat._id);
     }
     if (req.accepts('application/json')) {
       res.status(201).send(resultat);
     }
   })
   .catch(function(err) {
       res.status(500).send(err);
   });
});

router.put('/:id', function(req, res) {
 SongService.update(req.params.id, req.body)
   .then(function(resultat) {
     res.status(200).send(resultat);
    })
    .catch(function(err){
      res.status(500).send(err);
    })
 ;
});

router.delete('/:id', function(req, res) {
 SongService.remove({_id: req.params.id})
   .then(function(resultat) {
     if (!resultat) {
       res.status(404).send({err: 'No song found with id' + req.params.id});
       return;  // important !!
     }
     res.status(204).send();
    })
    .catch(function(err){
      res.status(500).send(err);
    })
 ;
});

module.exports = router;
