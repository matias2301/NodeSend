const Link = require('../models/Link.model');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

/**
|--------------------------------------------------
| CREATE LINK
|--------------------------------------------------
*/
const newLink = async (req, res, next) => {
    
    //verify if there's any errors
        const errors = validationResult(req);
        if( !errors.isEmpty() ) return res.status(400).json({ errors: errors.array() });

    const { originalName, name } = req.body;

    //create link object
    const link = new Link();

    link.url = shortid.generate();
    link.name = name;
    link.original_name = originalName;
    
    
    //if there's an authenticated user
    if(req.user){
        const { password, downloads } = req.body;

        // add number of downloads
        if(downloads) link.downloads = downloads;

        // add password
        if(password) {
            const salt = await bcrypt.genSalt(10);
            link.password = await bcrypt.hash( password, salt );
        }

        // add author
        link.author = req.user.id;
    }
    
    //save in DB
    try {
        await link.save();
        return res.json({
            status: 200,
            msg: link.url
        });        

    } catch (error) {
        console.log({error});        
    }
}

/**
|--------------------------------------------------
|  GET ALL LINKS
|--------------------------------------------------
*/
const getAllLinks = async (req, res) => {
    try {
        const links = await Link.find({}).select('url -_id');
        res.json( {links} );
    } catch (error) {
        console.log(error);
    }
}


/**
|--------------------------------------------------
| GET LINKS
|--------------------------------------------------
*/
const getLink = async (req, res, next) => {
    const { url } = req.params;

    //verify if the link exist
    const link = await Link.findOne({ url });

    if(!link) {
        res.status(400).json( {msg: "Link doesn't exist"} );
        return next();
    }

    res.json({
        file: link.name,
        password: false
    });
    next();
}

/**
|--------------------------------------------------
| VERIFY IF THE LINK HAS PASSWORD
|--------------------------------------------------
*/
const hasPass = async (req, res, next) => {
    const { url } = req.params;

    //verify if the link exist
    const link = await Link.findOne({ url });

    if(!link) {
        res.status(400).json( {msg: "Link doesn't exist"} );
        return next();
    }

    if( link.password ) {
        return res.json({
            file: link.name,
            password: true,
            link: link.url
        });
    }

    next();
}

/**
|--------------------------------------------------
| VERIFY IF PASSWORD IS CORRECT
|--------------------------------------------------
*/
const verifyPassword = async (req, res, next) => {
    const { url } = req.params;
    const { password } = req.body;
    
    const link = await Link.findOne({ url });
    
    if(bcrypt.compareSync( password, link.password )) {
        next();
    } else {
        return res.status(401).json({msg: 'Password Incorrecto'})
    }
}

module.exports = {
    newLink,
    getLink,
    getAllLinks,
    hasPass,
    verifyPassword
}