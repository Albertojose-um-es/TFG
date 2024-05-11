var express = require("express");
var router = express.Router();
var ayudante = require("./../public/javascripts/helper-database.js");

var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async function (req, res, next) {
  res.render("play", { tittle: "AccSoft" , highscore: req.session.highscore});
});
  
router.get("/info", function (req, res, next) {
  res.render("info", { tittle: "Información" });
});

router.get("/contrastChallenge", function (req, res, next) {
  res.render("contrastChallenge", { tittle: "Desafio de contraste", highscore: req.session.highscore});
});

router.get("/contrastChallenge2", async function (req, res, next) {

  res.render("contrastChallenge2", {
    tittle: "Desafío de contraste", highscore: req.session.highscore});
});

router.get("/altChallenge", async function (req, res, next) {
  res.render("altChallenge", {
    tittle: "Desafío de etiquetado alternativo", highscore: req.session.highscore});
});

router.get("/altChallenge2", async function (req, res, next) {
  res.render("altChallenge2", {
    tittle: "Desafío de etiquetado alternativo", highscore: req.session.highscore});
});

router.get("/structureChallenge", async function (req, res, next) {
  res.render("structureChallenge", {
    tittle: "Desafío de estructura", highscore: req.session.highscore});
});

router.get("/structureChallenge2", async function (req, res, next) {
  res.render("structureChallenge2", {
    tittle: "Desafío de estructura", highscore: req.session.highscore});
});

router.get("/formChallenge", async function (req, res, next) {
  res.render("formChallenge", {
    tittle: "Desafío de formulario", highscore: req.session.highscore});
});

router.get("/formChallenge2", async function (req, res, next) {
  res.render("formChallenge2", {
    tittle: "Desafío de formulario", highscore: req.session.highscore});
});

router.get("/highscore", async function (req, res, next) {
    ayudante.getConnection()
            .then( con => {
                return ayudante.getHighscore(con, req.session.email)
            })
            .then( data =>  {
                res.render('highscore', { 'tittle' : 'Highscore',
                                                  'highscore' : data[0].highscore})
                  }
            )
            .catch(error => {console.log(error)})
    
});

router.post('/updateHighscore', function(req, res, next) {
  let newHighscore = req.body.highscore;
  req.session.highscore = newHighscore;
  ayudante.getConnection()
      .then(con => {
          return ayudante.updateHighscore(con, req.session.email, newHighscore);
      })
      .then(() => {
          res.json({ message: 'Highscore updated successfully' });
      })
      .catch(error => {
          console.error('Error:', error);
          res.status(500).json({ message: 'An error occurred while updating highscore' });
      });
});

module.exports = router;
