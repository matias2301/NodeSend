const Link = require('../models/Link.model');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');

/**
|--------------------------------------------------
| UPLOAD FILES
|--------------------------------------------------
*/
const uploadFile = async (req, res, next) => {    

    const configMulter = {
        limits: { fileSize: req.user ? 1024 * 1024 * 10 : 1024 * 1024 },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname+'/../uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
                cb( null, `${shortid.generate()}${extension}` );
            }
        })
    }
    
    const upload = multer(configMulter).single('filename');
    
    upload( req, res, async(error) => {
        if(!error) res.json( {file: req.file.filename} );

        return next();
    });
}

/**
|--------------------------------------------------
|  DELETE FILE
|--------------------------------------------------
*/
const deleteFile = async (req, res) => {

    try {
        fs.unlinkSinc(__dirname+`/../uploads/${req.file}`);
    } catch (error) {
        console.log({ error });
    }
}

/**
|--------------------------------------------------
|  DOWNLOAD FILE
|--------------------------------------------------
*/
const downloadFile = async (req, res, next) => {

    const { file } = req.params;
    const link = await Link.findOne({ name: file });

    const fileDownload = __dirname + '/../uploads/' + file;
    res.download(fileDownload);
    
    const { downloads, name, id } = link;

    if( downloads === 1 ) {
        req.file = name;

        await Link.findOneAndRemove(id);
        next();

    } else {
        link.downloads--;
        await link.save();
    }
}

module.exports = {
    uploadFile,
    deleteFile,
    downloadFile
}