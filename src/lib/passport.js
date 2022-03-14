const passport = require('passport');
const Localstrategy = require('passport-local').Strategy

const pool = require("../database")
const helpers = require("../lib/Helpers")

//Login y autenticacion
passport.use('local.signin',new Localstrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username,password,done)=>{
    
    const rows = await pool.query('Select * from users where username = ?',[username])
    if(rows.length>0){
        const user = rows[0];
         const validPassword = await helpers.matchPassword(password,user.Password)
         if(validPassword){
             done(null,user);
         }
         else{
             done(null, false, req.flash('message','Incorrect Password'));
         }
    }
    else{
       return done(null,false,req.flash('message','The username does not exist')) 
    }
}
));



//Registro y cifrado


passport.serializeUser((user,done)=>{
    done(null,user.IdUser);
});

passport.deserializeUser(async(IdUser,done)=>{
    const rows= await pool.query('Select * from users where IdUser=?',[IdUser])
    done(null,rows[0]);
})