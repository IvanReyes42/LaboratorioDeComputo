//Importar Clase para conexion con BD
const pool = require('../database');
const helpers = require('../lib/helpers')

class IndexController {
    
    //Listar Abrir vista con datos 
    async List(req, res) {
        
    }

    //Abrir formulario para agregar
    FrmAdd(req, res) {
       
        //console.log(IdLab);
        res.render('Computadora/add');
    }

    //AgregarDatos
    async Add(req, res) {
      
        try{
            const{ IdComputadora,Marca,Monitor,Procesador,RAM,Almacenamiento,Conexion,Status } = req.body
            const FkIdLab = process.env.IDLAB;
            //console.log(FkIdLab);
            const newComputadora ={
                IdComputadora,
                Marca,
                Monitor,
                Procesador,
                RAM,
                Almacenamiento,
                Conexion,
                Status,
                FkIdLab
            };
            //console.log(newComputadora)

            const validar = await helpers.validateExistingComputer(IdComputadora);
            console.log(validar);
            if(validar){
                req.flash("message", `La computadora ${IdComputadora} ya esta registrado, intenta con otro`);
                res.redirect('/laboratorios/'+FkIdLab);
                return
            }

            await pool.query('Insert into Computadoras set ?',[newComputadora]);
            req.flash('success','Computadora agregado correctamente');
            res.redirect('/laboratorios/'+FkIdLab);
        }catch(error){
            console.log(error)
            req.flash('message','Hubo un error');
            res.redirect('/laboratorios/'+process.env.IDLAB);
        }
    }

    //Abrir formulario para editar
    async FrmEdit(req, res) {
        try{
            const {IdCom} = req.params;
            const Computadoras = await pool.query('select * from Computadoras where IdComputadora =?',[IdCom]);
            res.render('Computadora/edit',{Computadora:Computadoras[0]})
        }catch(error){
            console.log(error);
            res.render('Computadora/edit')
        }
    }

    //Editar de BD
    async Edit(req, res) {
        try{
            const { IdCom } = req.params;
            const { Marca,Monitor,Procesador,RAM,Almacenamiento,Conexion,Status } = req.body;
            const FkIdLab = process.env.IDLAB;
            const newComputadora ={
                Marca,
                Monitor,
                Procesador,
                RAM,
                Almacenamiento,
                Conexion,
                Status
            };
            console.log(newComputadora);
            await pool.query('Update Computadoras set ? where IdComputadora = ?',[newComputadora,IdCom]);
            req.flash('success','Computadora actualizada correctamente')
            res.redirect('/laboratorios/'+FkIdLab)
        }catch(error){
            console.log(error)
            req.flash('message','Hubo un error')
            res.redirect('/laboratorios/'+process.env.IDLAB)
        }
    }
    //Eliminar de BD
    async Delete(req,res){
        try{
            const {IdCom} = req.params;
            //console.log(IdCom);
            await pool.query('Delete from computadoras where IdComputadora = ?',[IdCom]);
            req.flash('success','Computadora eliminada correctamente')
            res.redirect('/laboratorios/'+process.env.IDLAB);
        }catch(error){
            console.log(error)
            req.flash('message','Hubo un error')
            res.redirect('/laboratorios/'+process.env.IDLAB);
        }
    }

    //Buscador
    async Search(req,res){
        try{
            const {Buscar} = req.body;
            console.log(Buscar);
            const Computadoras = await pool.query(`select * from Computadoras where IdComputadora like '%${Buscar.toLowerCase()}%' and FkIdLab = ${process.env.IDLAB}`);
            res.render('Computadora/list',{Computadoras})
        }catch(error){
            console.log(error)
            res.render('Computadora/list')
        }
    }


  }
  
  module.exports = IndexController;