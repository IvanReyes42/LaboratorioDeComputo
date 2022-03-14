const express = require('express')
const router = express.Router();
const IndexController = require("../controllers/authentication.controller");
const controller = new IndexController();


const {isLoggedIn, isNotLoggedin} = require('../lib/auth');

router.get('/Login',isNotLoggedin,controller.Login);
router.post('/Login',isNotLoggedin,controller.Logearse);
router.get('/Perfil',isLoggedIn,controller.Profile);
router.get('/Salir',isLoggedIn,controller.LogOut);

module.exports = router;