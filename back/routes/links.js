const express = require('express');
const router = express.Router();
const linksController = require('../controllers/links.controller');
const fileController = require('../controllers/file.controller');
const { check } = require('express-validator');
const auth = require('../middleware/authetication');

router.post('/',
    [
        check('name', 'upload a file').not().isEmpty(),
        check('original_name', 'upload a file').not().isEmpty(),
    ],
    auth,
    linksController.newLink
);

router.get('/:url',
    linksController.getLink,
    fileController.deleteFile
);

module.exports = router;