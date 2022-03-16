const express = require('express')
const router = express.Router();
//Hacemos Instancia de su controlador
const IndexController = require("../controllers/Computadoras.controller");
const controller = new IndexController();
//Clase para autenticar session activada

const {isLoggedIn,isAdminIn} = require('../lib/auth');

router.get('/add',isLoggedIn,isAdminIn,controller.FrmAdd);
router.post('/add',isLoggedIn,isAdminIn,controller.Add);
router.get('/delete/:IdCom',isLoggedIn,isAdminIn,controller.Delete);
router.get('/edit/:IdCom',isLoggedIn,isAdminIn,controller.FrmEdit);
router.post('/edit/:IdCom',isLoggedIn,isAdminIn,controller.Edit);
router.post('/search',isLoggedIn,isAdminIn,controller.Search);


module.exports = router;