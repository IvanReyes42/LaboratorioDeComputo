const express = require('express')
const router = express.Router();
const IndexController = require("../controllers/users.controller");
const controller = new IndexController();


const {isLoggedIn, isNotLoggedin ,isAdminIn} = require('../lib/auth');

router.get('/',isLoggedIn,isAdminIn,controller.List)
router.get('/add',isLoggedIn,isAdminIn,controller.FrmAdd)
router.post('/add',isLoggedIn,isAdminIn,controller.Add)
router.get('/delete/:IdUser',isLoggedIn,isAdminIn,controller.Delete)
router.get('/edit/:IdUser',isLoggedIn,isAdminIn,controller.FrmEdit)
router.post('/edit/:IdUser',isLoggedIn,isAdminIn,controller.Edit)
router.post('/',isLoggedIn,isAdminIn,controller.Search)

module.exports = router;