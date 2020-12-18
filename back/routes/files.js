const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controller');
const auth = require('../middleware/authetication');

router.post('/',
    auth,
    fileController.uploadFile
);

router.get('/:file',
    fileController.downloadFile,
    fileController.deleteFile
);

module.exports = router;


