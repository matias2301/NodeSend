const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const createUser = async (req, res) => {

    //verify if there's any errors
    const errors = validationResult(req);
    if( !errors.isEmpty() ) return res.status(400).json({ errors: errors.array() });

    const { email, name, password } = req.body;

    const user = await User.findOne({ email });

    //verify if the user already exist
    if( user ) return res.status(400).json({ msj: "User already exist" });

    //if not proceed to create the user
    //previously i must hash the password

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash( password, salt );

    const newUser = new User({
        email,
        name,
        password: hashPass
    });

    //then we save the new user
    newUser.save( (err, userCreated) => {
        
        if( err ){
            return res.json({
                status: 400,
                msj: "an error has ocurred",
                err
            });            
        }

        res.json({
            status: 200,
            userCreated,
            msj: "User created successfully"
        });
    });
}

module.exports = {
    createUser
}