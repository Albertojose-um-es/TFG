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

router.get('/contrastChallenge', function(req, res, next) {   
    res.render('contrastChallenge', {tittle: 'Desafío de contraste'})
    });

router.get('/contrastChallenge2', function(req, res, next) {   
    res.render('contrastChallenge2', {tittle: 'Desafío de contraste'})
    });
    

module.exports = router;
// Compare this snippet from AccSoft/views/index.hbs:

