const express = require('express')
const router = express.Router();
//Hacemos Instancia de su controlador
const IndexController = require("../controllers/laboratorios.controller");
const controller = new IndexController();
//Clase para autenticar session activada

const {isLoggedIn,isAdminIn} = require('../lib/auth');


router.get('/',isLoggedIn,isAdminIn,controller.List);
router.get('/add',isLoggedIn,isAdminIn,controller.FrmAdd);
router.post('/add',isLoggedIn,isAdminIn,controller.Add);
router.get('/edit/:IdLab',isLoggedIn,isAdminIn,controller.FrmEdit);
router.post('/edit/:IdLab',isLoggedIn,isAdminIn,controller.Edit);
router.get('/delete/:IdLab',isLoggedIn,isAdminIn,controller.Delete);
router.post('/',isLoggedIn,isAdminIn,controller.Search);
router.get('/:IdLab',isLoggedIn,isAdminIn,controller.Computadoras);


module.exports = router;