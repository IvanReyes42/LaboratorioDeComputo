//Importar Clase para conexion con BD
const pool = require('../database');

class IndexController {
    //Listar Abrir vista con datos 
    async List(req, res) {
        try{
            const Laboratorios = await pool.query('select * from Laboratorios');
            //console.log(Laboratorios);
            res.render('Laboratorio/list',{Laboratorios})
        }catch(error){
            console.log(error);
            res.render('Laboratorio/list')
        }
    }

    //Abrir formulario para agregar
    FrmAdd(req, res) {
        res.render('Laboratorio/add');
    }

    //AgregarDatos
    async Add(req, res) {
        try{
            const{ Nombre,Ubicacion } = req.body
            const newLab ={
                Nombre,
                Ubicacion
            };
            console.log(newLab)
            await pool.query('Insert into Laboratorios set ?',[newLab]);
            req.flash('success','Laboratorio agregado correctamente');
            res.redirect('/laboratorios');
        }catch(error){
            console.log(error)
            req.flash('message','Hubo un error');
            res.redirect('/laboratorios');
        }
    }

    //Abrir formulario para editar
    async FrmEdit(req, res) {
        try{
            const {IdLab} = req.params;
            const Laboratorios = await pool.query('select * from Laboratorios where IdLaboratorio =?',[IdLab]);
            res.render('Laboratorio/edit',{Laboratorio:Laboratorios[0]})
        }catch(error){
            console.log(error)
            res.render('Laboratorio/edit')
        }
    }

    //Editar de BD
    async Edit(req, res) {
        try{
            const { IdLab } = req.params;
            const { Nombre, Ubicacion } = req.body;
            const newLab ={
                Nombre,
                Ubicacion
            };
            console.log(newLab);
            await pool.query('Update Laboratorios set ? where IdLaboratorio = ?',[newLab,IdLab]);
            req.flash('success','Laboratorio actualizado correctamente')
            res.redirect('/laboratorios')
        }catch{
            console.log(error)
            req.flash('message','Hubo un error');
            res.redirect('/laboratorios')
        }
    }
    //Eliminar de BD
    async Delete(req,res){
        try{
            const {IdLab} = req.params;
            await pool.query('Delete from Laboratorios where IdLaboratorio = ?',[IdLab]);
            req.flash('success','Laboratorio eliminado correctamente')
            res.redirect('/laboratorios')
        }catch(error){
            console.log(error)
            req.flash('message','Hubo un error');
            res.redirect('/laboratorios')
        }
    }

    //Buscador
    async Search(req,res){
        try{
            const {Buscar} = req.body;
            console.log(Buscar);
            const Laboratorios = await pool.query(`select * from Laboratorios where Nombre like '%${Buscar.toLowerCase()}%'`);
            res.render('Laboratorio/list',{Laboratorios})
        }catch(error){
            console.log(error)
            res.render('Laboratorio/list')
        }
    }

    async Computadoras(req,res){
        try{
            const {IdLab} = req.params;
            //console.log(IdLab);
            const Computadoras = await pool.query('select * from computadoras where FkIdLab = ?',[IdLab]);
            process.env.IDLAB = IdLab; 
            //console.log(process.env.IDLAB);
            res.render('Computadora/list',{Computadoras});
        }catch(error){
            console.log(error)
            res.render('Computadora/list');
        }
    }

    

  }
  
  module.exports = IndexController;