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
                cb(null, __direname+'/../uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.').file.originalname.length)
                cb( null, `${shortid.generate()}${extension}` );
            }
        })
    }
    
    const upload = multer(configMulter).single('file');
    
    upload( req, res, async(error) => {
        
        if(!error) res.json( {file: req.file.filename} );

        return next();
    });
}

const deleteFile = async (req, res) => {

    try {
        fs.unlinkSinc(__dirname+`/../uploads/${req.file}`);
    } catch (error) {
        console.log({ error });
    }
}

module.exports = {
    uploadFile,
    deleteFile
}