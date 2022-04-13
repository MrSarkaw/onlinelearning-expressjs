const bcrypt = require('bcrypt')
const User = require('../models/user')

const {validationResult} = require('express-validator')

exports.loginPage = (req, res, next)=>{
    res.render('auth/login',{
        errorMessage:''
    })
};

exports.registerPage = (req, res, next)=>{
    res.render('auth/register',{
        errorMessage:'',
        oldValue:''
    });
};

exports.register = async (req, res, next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password =await bcrypt.hash(req.body.password, 12);

    const errors = validationResult(req)

    if(!errors.isEmpty()){

        return res.status(422).render('auth/register',{
            errorMessage:errors.array(),
            oldValue: req.body
        });
    }

   let user = await User.create({
        name:name,
        email:email,
        password:password
    });

    req.session.isLogged = true;
    req.session.user = user;
    
    res.redirect('/')
}


exports.login = async (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);
    console.log(errors)
    if(!errors.isEmpty()){
        return res.status(422).render('auth/login',{
            errorMessage:errors.array()
        })
    }
    
    const user = await User.findOne({where:{email:email}});
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