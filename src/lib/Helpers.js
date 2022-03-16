const bcryptjs = require('bcryptjs')
const pool = require('../database');
const helpers = {};

helpers.encryptPassword = async(password)=>{
   const salt = await bcryptjs.genSalt(10);
   const hash = await bcryptjs.hash(password,salt);
   return hash;
};

helpers.matchPassword = async(password,savedPassword)=>{
    try{
        return await bcryptjs.compare(password,savedPassword);
    }catch(e){
        console.log(e);
    }
}

helpers.validateExistingUserName = async (UserName)=>{
    const user = await pool.query('select * from users where UserName = ?',[UserName])
    //console.log(user.length)
    if(user.length > 0)
        return true
    else
        return false    
}

helpers.validateExistingComputer = async (IdComputadora)=>{
    const computer = await pool.query('select * from computadoras where IdComputadora = ?',[IdComputadora])
    //console.log(user.length)
    if(computer.length > 0)
        return true
    else
        return false    
}

module.exports = helpers;