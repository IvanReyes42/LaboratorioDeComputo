const {format} = require('timeago.js')



const helpers = {};

helpers.timeago = (timestamp) =>{
    return format(timestamp);
};

helpers.xif = (q, valor,options)=>{
    if(q === valor)
    return options.fn(this);
}

helpers.ChangeFecha = (Fecha)=>{
    if(Fecha.getMonth()+1 < 9){
        const newFecha = Fecha.getFullYear()+"-0"+(Fecha.getMonth()+1)+"-"+Fecha.getDate();
        return newFecha ;
    }
    else{
        const newFecha = Fecha.getFullYear()+"-"+(Fecha.getMonth()+1)+"-"+Fecha.getDate();
        return newFecha ; 
    }
    
   
}

module.exports = helpers;