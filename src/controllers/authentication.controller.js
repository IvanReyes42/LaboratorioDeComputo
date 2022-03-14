const pool = require('../database');
const passport = require('passport')

class IndexController {
    //Formulario para Registrar Usuarios 
    

    //Formulario Login
    Login(req, res) {
        res.render('auth/Login')
    }

    //Evento de logearse
    Logearse(req, res,next) {
        passport.authenticate('local.signin',{
            successRedirect:'/',
            failureRedirect:'/Login',
            failureFlash: true
        })(req,res,next);
    }

    //Abrir vista perfil
    Profile(req, res) {
        res.render('profile')
    }
    //Terminar Seccion 
    LogOut(req,res){
        req.logOut();
        res.redirect('/Login')
    }


  }
  
  module.exports = IndexController;