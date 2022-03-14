const express = require('express')
const router = express.Router();
const IndexController = require("../controllers/users.controller");
const controller = new IndexController();


const {isLoggedIn, isNotLoggedin} = require('../lib/auth');

router.get('/',isLoggedIn,controller.List)
router.get('/add',isLoggedIn,controller.FrmAdd)
router.post('/add',isLoggedIn,controller.Add)
router.get('/delete/:IdUser',isLoggedIn,controller.Delete)
router.get('/edit/:IdUser',isLoggedIn,controller.FrmEdit)
router.post('/edit/:IdUser',isLoggedIn,controller.Edit)
router.post('/',isLoggedIn,controller.Search)

module.exports = router;