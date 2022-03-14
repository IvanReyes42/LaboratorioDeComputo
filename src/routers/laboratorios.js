const express = require('express')
const router = express.Router();
//Hacemos Instancia de su controlador
const IndexController = require("../controllers/laboratorios.controller");
const controller = new IndexController();
//Clase para autenticar session activada

const {isLoggedIn} = require('../lib/auth');


router.get('/',isLoggedIn,controller.List);
router.get('/add',isLoggedIn,controller.FrmAdd);
router.post('/add',isLoggedIn,controller.Add);
router.get('/edit/:IdLab',isLoggedIn,controller.FrmEdit);
router.post('/edit/:IdLab',isLoggedIn,controller.Edit);
router.get('/delete/:IdLab',isLoggedIn,controller.Delete);
router.post('/',isLoggedIn,controller.Search);
router.get('/:IdLab',isLoggedIn,controller.Computadoras);


module.exports = router;