module.exports = {

    isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/Login');
    },

    isNotLoggedin(req,res,next){
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/Perfil');
    },

    isAdminIn(req, res, next) {
        if (req.user.Rol == "Administrador") {
            return next();
        }
        return res.redirect('/Perfil');
    }
}