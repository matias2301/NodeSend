const express = require('express');
const router = express.Router();
const linksController = require('../controllers/links.controller');
const fileController = require('../controllers/file.controller');
const { check } = require('express-validator');
const auth = require('../middleware/authetication');

router.post('/',
    [
        check('name', 'upload a file').not().isEmpty(),
        check('originalName', 'upload a file').not().isEmpty(),
    ],
    auth,
    linksController.newLink
);

router.get('/',
    linksController.getAllLinks
);

router.get('/:url',
    linksController.hasPass,
    linksController.getLink,
);

router.post('/:url',
    linksController.verifyPassword,
    linksController.getLink,
);

module.exports = router;