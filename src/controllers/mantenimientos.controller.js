const pool = require('../database');
const passport = require('passport')
const helpers = require('../lib/helpers')

//Modules PDF
const PdfPrinter = require('pdfmake')
const fonts = require('../recursos/fonts')
const styles = require('../recursos/syles')
const fs = require("fs");
const printer = new PdfPrinter(fonts);


class IndexController {
    
    async ListAdmin(req, res) {
        try{
            const Mantenimientos = await pool.query('select m.*,u.UserName from mantenimientos m, users u where FkIdUser = Iduser');
            res.render('Mantenimientos/listAdmin',{Mantenimientos})
        }catch(error){
            res.render('Mantenimientos/listAdmin')
        }
    }

    async ListTec(req, res) {
        try{
            const Mantenimientos = await pool.query('select * from mantenimientos where FkIdUser = ?',[req.user.IdUser]);
            //console.log(Mantenimientos[0].Fecha.toLocaleString());
            res.render('Mantenimientos/listTec',{Mantenimientos})
        }catch(error){
            res.render('Mantenimientos/listTec')
        }
    }

    async Laboratorios(req,res){
        
        try{
            const Computadoras = await pool.query('select c.*,l.nombre from computadoras c,laboratorios l where FkIdLab = IdLaboratorio');
            const Laboratorios = await pool.query('select * from laboratorios');

            res.render('Laboratorio/listTec',{Computadoras,Laboratorios});
        }catch(error){
            console.log(error);
            res.render('Laboratorio/listTec');
        }
    }

    async SearchComputadoras(req,res){
        try{
            const {Buscar,Laboratorio} = req.body;
            //console.log(Buscar);
            //console.log(Laboratorio);
            if(Laboratorio == 0){
                const Computadoras = await pool.query(`select c.*,l.nombre from computadoras c,laboratorios l where FkIdLab = IdLaboratorio and IdComputadora like'%${Buscar}%'`);
                const Laboratorios = await pool.query('select * from laboratorios');
                res.render('Laboratorio/listTec',{Computadoras,Laboratorios})
            }
            else{
                const Computadoras = await pool.query(`select c.*,l.nombre from computadoras c,laboratorios l where FkIdLab = IdLaboratorio and IdLaboratorio =${Laboratorio} and IdComputadora like'%${Buscar}%'`);
                const Laboratorios = await pool.query('select * from laboratorios');
                res.render('Laboratorio/listTec',{Computadoras,Laboratorios})
            }
            
        }catch(error){
            console.log(error);
            res.render('Laboratorio/listTec')
        }
    }

    async FrmAdd(req, res) {
        try{
            const {IdCom} = req.params;
           // console.log(IdCom);
            const Computadoras = await pool.query('select * from Computadoras where IdComputadora = ?',[IdCom])
            //console.log(Computadoras);
            res.render('Mantenimientos/add',{Computadora:Computadoras[0]});
        }catch(error){
            console.log(error);
            res.render('Mantenimientos/add');
        }

        
    }

    async Add(req, res) {
        try{
            const{ FkIdComputadora,Fecha,Tipo, Problematica} = req.body
            
            const newMante ={
                Fecha,
                Tipo,
                Problematica,
                status: 1,
                FkIdUser: req.user.IdUser,
                FkIdComputadora

            };
            console.log(newMante);
            await pool.query('Insert into mantenimientos set ?',[newMante]);
            req.flash('success','Mantenimiento solicitado correctamente');
            res.redirect('/mantenimientos/tecnico');
        }catch(error){
            console.log(error);
            req.flash('message','Un error ha ocurido');
            res.redirect('/mantenimientos/tecnico');
        }
    }

    //Abrir formulario para editar
    async FrmEdit(req, res) {
        try{
            const {IdMan} = req.params;
            const Mantenimientos = await pool.query('select * from Mantenimientos where IdMantenimiento =?',[IdMan]);
            //console.log(Mantenimientos[0])
            res.render('Mantenimientos/edit',{m:Mantenimientos[0]})
        }catch(error){
            console.log(error)
            res.render('Mantenimientos/edit')
        }
    }

    //Editar de BD
    async Edit(req, res) {
        try{
            const { IdMan } = req.params;
            const { Fecha,Tipo,Problematica,FkIdComputadora } = req.body;
            const newMan ={
                Fecha,
                Tipo,
                Problematica
            };
            console.log(newMan);
            await pool.query('Update Mantenimientos set ? where IdMantenimiento = ?',[newMan,IdMan]);
            req.flash('success','Solicitud de mantenimiento actualizada correctamente')
            res.redirect('/Mantenimientos/tecnico')
        }catch(error){
            console.log(error)
            req.flash('message','Un error ha ocurido')
            res.redirect('/Mantenimientos/tecnico')
        }
    }
    //Eliminar de BD
    async Delete(req,res){
        try{    
            const {IdMan} = req.params;
           // console.log(IdUser)
            await pool.query('Delete from Mantenimientos where IdMantenimiento = ?',[IdMan]);
            req.flash('success','Mantenimiento eliminado correctamente')
            res.redirect('/Mantenimientos/')
        }catch(error){
            console.log(error)
            req.flash('message','Un error ha ocurido')
            res.redirect('/Mantenimientos/')
        }
    }

    //Buscador
    async Search(req,res){
        try{
            const {Buscar} = req.body;
            console.log(Buscar);
            const Mantenimientos = await pool.query(`select m.*,u.UserName from mantenimientos m, users u where FkIdUser = Iduser and IdMantenimiento like '%${Buscar}%'`);
            res.render('Mantenimientos/listAdmin',{Mantenimientos})
        }catch(error){
            console.log(error);
            res.render('Mantenimientos/listAdmin')
        }
    }

    async SearchTecnico(req,res){
        try{
            const {Buscar} = req.body;
            console.log(Buscar);
            const Mantenimientos = await pool.query(`select * from Mantenimientos where IdMantenimiento like '%${Buscar}%'`);
            res.render('Mantenimientos/listTec',{Mantenimientos})
        }catch(error){
            console.log(error);
            res.render('Mantenimientos/listTec')
        }
    }

    async Autorizar(req,res){
        try{
            const { IdMan } = req.params;
            
            const newMan ={
                status:2
            };
            console.log(newMan);
            await pool.query('Update Mantenimientos set ? where IdMantenimiento = ?',[newMan,IdMan]);
            req.flash('success','Solicitud de mantenimiento autorizada y en proceso correctamente')
            res.redirect('/Mantenimientos')

        }catch(error){
            console.log(error)
            req.flash('message','Un error ha ocurido')
            res.redirect('/Mantenimientos')
        }

    }

    async Cancelar(req,res){
        try{
            const { IdMan } = req.params;
            
            const newMan ={
                status:3
            };
            console.log(newMan);
            await pool.query('Update Mantenimientos set ? where IdMantenimiento = ?',[newMan,IdMan]);
            req.flash('success','Solicitud de mantenimiento cancelada correctamente')
            res.redirect('/Mantenimientos')

        }catch(error){
            console.log(error)
            req.flash('message','Un error ha ocurido')
            res.redirect('/Mantenimientos')
        }

    }

    async PDF(req,res){
        try{
            const {IdMan} = req.params
            
            const Mantenimientos = await pool.query('select m.*,u.FullName from mantenimientos m, users u where FkIdUser = Iduser and IdMantenimiento = ?',[IdMan]);
            const Mantenimiento = Mantenimientos[0];
           // console.log(Mantenimiento);
            var options = { year: 'numeric', month: 'long', day: 'numeric' };

           
            const Fecha = Mantenimiento.Fecha.toLocaleDateString("es-ES", options)
            

            console.log(IdMan);
            var docDefinition ={
                content:[
                    {text: 'Reporte de Solicitud de Mantenimientos No.'+Mantenimiento.IdMantenimiento, style: 'header'},
                        'Datos del reporte de mantenimiento al equipo de computo '+Mantenimiento.FkIdComputadora+' por parte del tecnico '+Mantenimiento.FullName,
                        
                        {
                            style: 'tableExample',
                            table: {
                                widths: ['*', '*','*','*','*','*'],
                                body: [
                                    ['Codigo', 'Fecha', 'Tipo','Problematica','Status','Computadora'],
					                [Mantenimiento.IdMantenimiento, Fecha, Mantenimiento.Tipo,Mantenimiento.Problematica,Mantenimiento.Status,Mantenimiento.FkIdComputadora]
                                ]
                            }
                        },
                        {text: 'Descripción de los problemas o situacion presente ', style: 'header'},
                        {
                            style: 'tableExample',
                            table: {
                                widths: ['*'],
                                heights: [20,100],
                                body: [
                                    ['Problematica'],
                                    ['']
                                ]
                            }
                        },

                        {text: 'Describa el proceso de mantenimiento realizado', style: 'header'},
                        {
                            style: 'tableExample',
                            table: {
                                widths: ['*'],
                                heights: [120],
                                body: [
                                    ['']
                                ]
                            }
                        },
                        {text: 'Describa el estado de los elementos del equipo de computo', style: 'header'},
                        {
                            style: 'tableExample',
                            table: {
                                widths: ['*', '*','*'],
                                body: [
                                    ['Elemento', 'Estado', 'Observaciones'],
					                ['Monitor','',''],
                                    ['CPU','',''],
                                    ['Teclado','',''],
                                    ['Raton','',''],
                                    ['Conexion','',''],
                                    ['Estatus Actual','',''],
                                ]
                            }
                        },
                        '\n',
                        {
                            alignment: 'center',
                            columns: [
                                {
                                    text: '________________________________________ \n                 '+Mantenimiento.FullName
                                },
                                {
                                    text: '________________________________________ \n                 Administrador'
                                }
                            ]
                        },
                ],
                
                styles:styles
            };

            let pdfDoc =  printer.createPdfKitDocument(docDefinition);
            //let pdfDoc = printer.createPdf(docDefinition).open();
            pdfDoc.pipe(fs.createWriteStream("./src/PDF/pdfTest.pdf"));
            pdfDoc.pipe(res);
            pdfDoc.end();

            
        }catch(error){
            console.log(error);
        }

        
    }

  }
  
  module.exports = IndexController;