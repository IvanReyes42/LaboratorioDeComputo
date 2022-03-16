const express = require('express')
const router = express.Router();
const IndexController = require("../controllers/mantenimientos.controller");
const controller = new IndexController();


const {isLoggedIn, isNotLoggedin, isAdminIn} = require('../lib/auth');

router.get('/',isLoggedIn,isAdminIn,controller.ListAdmin)
router.get('/tecnico',isLoggedIn,controller.ListTec)
router.get('/add/:IdCom',isLoggedIn,isAdminIn,controller.FrmAdd)
router.post('/add',isLoggedIn,isAdminIn,controller.Add)
router.get('/solicitud',isLoggedIn,controller.Laboratorios);
router.post('/solicitud',isLoggedIn,controller.SearchComputadoras);
router.get('/edit/:IdMan',isLoggedIn,controller.FrmEdit)
router.post('/edit/:IdMan',isLoggedIn,controller.Edit)
router.post('/tecnico',isLoggedIn,controller.SearchTecnico)
router.get('/delete/:IdMan',isLoggedIn,isAdminIn,controller.Delete)
router.post('/',isLoggedIn,isAdminIn,controller.Search)
router.get('/autorizar/:IdMan',isLoggedIn,isAdminIn,controller.Autorizar)
router.get('/cancelar/:IdMan',isLoggedIn,isAdminIn,controller.Cancelar)
router.get('/pdf/:IdMan',isLoggedIn,controller.PDF)


module.exports = router;