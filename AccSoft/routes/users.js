
var express = require('express');
var router = express.Router();
var ayudante = require('./../public/javascripts/helper-database.js');

var app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));


router.get('/register', function(req, res, next) {
  res.render('userRegister', {tittle: 'Registro nuevo usuario'})
});

router.post('/register', function(req, res, next) {
  let name = req.body.name
  let apellidos = req.body.apellidos
  let date = req.body.date
  let mail = req.body.mail
  let password = req.body.password
  console.log(name)
  console.log(apellidos)
  console.log(date)
  console.log(mail)
  console.log(password)

  ayudante.getConnection()
              .then( 
                con => {return ayudante.registerContact(con, name, apellidos, date, mail, password)
              })
              .then( result =>                   
                  { for(ele in result) console.log(ele)
                    if (result[0].affectedRows > 0){
                      //
                      req.session.contact_id = result[0].insertId;
                      req.session.email = mail;
                      console.log(req.session.contact_id);
                      req.session.save(function(err) {
                        // Maneja el error si existe
                        if(err) {
                          console.log(err);
                          res.status(500).send('Error al guardar la sesión');
                        } else {
                          res.redirect('/'); // Redirige al usuario a la página principal
                        }
                      });
                    }
                    else 
                      res.render('contactRegister', {tittle: 'Formulario de contacto de la Web'}, {error: 'Error al insertar el contacto'}) 
                  }
                )
                .catch(error => {console.log(error)}) 
});

router.get('/all', function(req, res, next) {
  ayudante.getConnection()
              .then( con => {
                  return ayudante.getAllContact(con)
              })
              .then( data =>  {
                  res.render('contacts', { 'tittle' : 'Lista de Contactos a la Web',
                                                    'contactos' : data})
                    }
              )
              .catch(error => {console.log(error)}) 
});

router.get('/login', function(req, res, next) {
  ayudante.getConnection()
              .then( con => {
                  return ayudante.getAllContact(con)
              })
              .then( data =>  {
                  res.render('login', { 'tittle' : 'Iniciar sesión',
                                                    'contactos' : data})
                    }
              )
              .catch(error => {console.log(error)}) 
});

router.post('/login', (req, res) => {
 
  const email = req.body.mail;
  const contrasena = req.body.password;
  console.log(email);
  console.log(contrasena);

  ayudante .getConnection()
            .then( con => {
                return ayudante.getContactoPorEmail(con, email)
            })  
            .then( data => {
                if (data.length === 0) { // Usuario no encontrado
                    res.sendStatus(401);
                    return;
                }
                const usuario = data[0];
                if (contrasena !== usuario.password) { // Contraseña incorrecta
                    res.sendStatus(401);
                    return;
                }
                // Autenticación exitosa
                const id = usuario.id;
                req.session.contact_id = id;
                req.session.email = email;
                console.log(req.session.contact_id);
                req.session.save(function(err) {
                  // Maneja el error si existe
                  if(err) {
                    console.log(err);
                    res.status(500).send('Error al guardar la sesión');
                  } else {
                    res.redirect('/'); // Redirige al usuario a la página principal
                  }
                });
            })
            .catch(error => {console.log(error)})
});

router.get('/logout', (req, res) => {

  ayudante .getConnection()
            .then( con => {
                req.session.contact_id = -1;
                req.session.email = "";
                console.log(req.session.contact_id);
                res.redirect('/');
            })
            .catch(error => {console.log(error)})
});

module.exports = router;
