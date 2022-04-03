const bcrypt = require('bcrypt')
const User = require('../models/user')


exports.loginPage = (req, res, next)=>{
    res.render('auth/login')
};

exports.registerPage = (req, res, next)=>{
    res.render('auth/register');
};

exports.register = async (req, res, next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password =await bcrypt.hash(req.body.password, 12);

    User.create({
        name:name,
        email:email,
        password:password
    });

    return res.redirect('/')
}