var express = require('express');
var router = express.Router();
var ayudante = require('./../public/javascripts/helper-database.js');

var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

router.get('/highscore', async function (req, res, next) {
    try {
      const email = req.session.email;
      console.log(email);
      let con = await ayudante.getConnection();
      let  = await ayudante.getContactoId(con, contacId);
        let highscore = await ayudante.getHighscore(con, email);
        console.log(highscore);
        res.json({ highscore });
    }
    catch (error) {
      console.log(error)
    }
});