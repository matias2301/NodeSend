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

    const { original_name, password } = req.body;

    //create link object
    const link = new Link();

    link.url = shortid.generate();
    link.name = shortid.generate();
    link.original_name = original_name;
    

    //if there's an authenticated user
    if(req.user){
        const { password, downloads } = req.body;

        // add number of downloads
        if(downloads) link.downloads = downloads;

        // add password
        if(password) {
            const salt = bcrypt.genSalt(10);
            link.password = bcrypt.hash( password, salt );
        }

        // add author
        link.author = req.user.id;
    }

    //save in DB
    try {
        await link.save();
        return res.json({
            status: 200,
            msj: link.url
        });        

    } catch (error) {
        console.log({error});
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
        res.status(400).json( {msj: "Link doesn't exist"} );
        return next();
    }

    //if link exist
    const { downloads, name } = link;

    if( downloads === 1 ) {
        req.file = name;

        await Link.findOneAndRemove(url);

        next();

    } else {
        link.downloads--;
        await link.save();
    }
        
}


module.exports = {
    newLink,
    getLink
}