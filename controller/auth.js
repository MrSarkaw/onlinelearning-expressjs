exports.loginPage = (req, res, next)=>{
    res.render('auth/login')
};

exports.registerPage = (req, res, next)=>{
    res.render('auth/register');
};