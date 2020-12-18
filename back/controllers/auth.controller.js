const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env' });
const { validationResult } = require('express-validator');

const authenticateUser = async (req, res, next ) => {

    //verify if there's any errors    
    const errors = validationResult(req);
    if( !errors.isEmpty() ) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    await User.findOne({ email }, ( err, userDB ) => {
        if(err){
            return res.json({
                status: 500,
                msj: "An error ocurred",
                err
            });
        }

        if(!userDB){
            res.status(401).json({msj : 'Email or Password Incorrect'});
            return next();
        }

        if(!bcrypt.compareSync(password, userDB.password) ){
            res.status(401).json({msj : 'Email or Password Incorrect'});
            return next();
        }

        const token = jwt.sign({
            user: userDB
        }, process.env.SEED, {
            expiresIn: '8h'
        });
        
        res.json({
            status: 200,
            user: userDB,
            token
        })
    });


}

const getUserAuth = async (req, res) => {    
    res.json({ user: req.user });
}

module.exports = {    
    authenticateUser,
    getUserAuth
}