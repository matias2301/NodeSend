const express = require('express');
const router = express.Router();
const fileController = require('../controllers/file.controller');
const auth = require('../middleware/authetication');

router.post('/',
    auth,
    fileController.uploadFile
);

module.exports = router;


