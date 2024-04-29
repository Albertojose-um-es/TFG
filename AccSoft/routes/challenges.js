var express = require('express');
var router = express.Router();
var ayudante = require('./../public/javascripts/helper-database.js');

var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', function(req, res, next) {
    res.render('play', {tittle: 'Jugar'})
    });


router.get('/info', function(req, res, next) {  
    res.render('info', {tittle: 'Información'})
    });

router.get('/contrastChallenge', async function(req, res, next) {   
    let con = await ayudante.getConnection();
    let highscore = await ayudante.getHighscore(con, req.session.email);
    res.render('contrastChallenge', {tittle: 'Desafío de contraste', highscore: highscore[0].highscore})
    });

router.get('/contrastChallenge2', function(req, res, next) {   
    res.render('contrastChallenge2', {tittle: 'Desafío de contraste'})
    });

router.get('/altChallenge', function(req, res, next) {
    res.render('altChallenge', {tittle: 'Desafío de etiquetado alternativo'})
    });

router.get('/altChallenge2', function(req, res, next) {
    res.render('altChallenge2', {tittle: 'Desafío de etiquetado alternativo'})
    });

router.get('/structureChallenge', function(req, res, next) {
    res.render('structureChallenge', {tittle: 'Desafío de estructura'})
    });

router.get('/structureChallenge2', function(req, res, next) {
    res.render('structureChallenge2', {tittle: 'Desafío de estructura'})
    });

module.exports = router;