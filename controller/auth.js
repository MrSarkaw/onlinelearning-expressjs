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


exports.login = async (req, res, next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({where:{email:req.body.email}});
    if(!user){
        return res.redirect('/login')
    }

    const check = await bcrypt.compare(password, user.password);

    if(check){
        req.session.isLogged = true;
        req.session.user = user;
    }else{
        return res.redirect('/login')
    }
    return res.redirect('/')
}

exports.logout = async (req, res, next)=>{
    req.session.destroy(()=>{
        res.redirect('/')
    });
   
}