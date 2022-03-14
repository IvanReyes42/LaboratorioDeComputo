const pool = require('../database');
const passport = require('passport')
const helpers = require('../lib/helpers')

class IndexController {
    
    async List(req, res) {
        try{
            const Users = await pool.query('select * from users');
            res.render('User/list',{Users})
        }catch(error){
            res.render('User/list')
        }
    }

    FrmAdd(req, res) {
        res.render('User/add');
    }

    async Add(req, res) {
        try{
            const{ fullname,username, password,rol } = req.body
            const newUser ={
                fullname,
                username,
                password,
                rol
            };
            newUser.password = await helpers.encryptPassword(password);
            const validar = await helpers.validateExistingUserName(username);
            //console.log(newUser);
            //console.log(validar);
            if(validar){
                req.flash("message", `El usuario ${username} ya esta registrado, intenta con otro`);
                res.redirect("/users/add");
                return
            }
            //console.log(newUser)
            await pool.query('Insert into users set ?',[newUser]);
            req.flash('success','Usuario agregado correctamente');
            res.redirect('/users');
        }catch(error){
            console.log(error);
            req.flash('message','Un error ha ocurido');
            res.redirect('/users');
        }
    }

    //Abrir formulario para editar
    async FrmEdit(req, res) {
        try{
            const {IdUser} = req.params;
            const Users = await pool.query('select * from Users where IdUser =?',[IdUser]);
            //console.log(Users[0])
            res.render('User/edit',{User:Users[0]})
        }catch(error){
            console.log(error)
            res.render('User/edit')
        }
    }

    //Editar de BD
    async Edit(req, res) {
        try{
            const { IdUser } = req.params;
            const { fullname,username,rol } = req.body;
            const newUser ={
                fullname,
                rol
            };
            console.log(newUser);
            await pool.query('Update Users set ? where IdUser = ?',[newUser,IdUser]);
            req.flash('success','Usuario actualizado correctamente')
            res.redirect('/users')
        }catch(error){
            console.log(error)
            req.flash('message','Un error ha ocurido')
            res.redirect('/users')
        }
    }
    //Eliminar de BD
    async Delete(req,res){
        try{    
            const {IdUser} = req.params;
            console.log(IdUser)
            if(IdUser == req.user.IdUser)
            {
                req.flash("message", `No puedes eliminar un usuario activo`);
                res.redirect("/users");
                return
            }
            await pool.query('Delete from Users where IdUser = ?',[IdUser]);
            req.flash('success','Usuario eliminado correctamente')
            res.redirect('/users')
        }catch(error){
            console.log(error)
            req.flash('message','Un error ha ocurido')
            res.redirect('/users')
        }
    }

    //Buscador
    async Search(req,res){
        try{
            const {Buscar} = req.body;
            console.log(Buscar);
            const Users = await pool.query(`select * from Users where UserName like '%${Buscar.toLowerCase()}%'`);
            res.render('User/list',{Users})
        }catch(error){
            console.log(error);
            res.render('User/list')
        }
    }

  }
  
  module.exports = IndexController;