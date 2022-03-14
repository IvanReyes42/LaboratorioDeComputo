const express = require('express')
const router = express.Router();
//Hacemos Instancia de su controlador
const IndexController = require("../controllers/Computadoras.controller");
const controller = new IndexController();
//Clase para autenticar session activada

const {isLoggedIn} = require('../lib/auth');

router.get('/add',isLoggedIn,controller.FrmAdd)
router.post('/add',isLoggedIn,controller.Add)
router.get('/delete/:IdCom',isLoggedIn,controller.Delete)
router.get('/edit/:IdCom',isLoggedIn,controller.FrmEdit)
router.post('/edit/:IdCom',isLoggedIn,controller.Edit)
router.post('/search',isLoggedIn,controller.Search)


module.exports = router;