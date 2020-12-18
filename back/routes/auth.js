const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { check } = require('express-validator');
const authentication = require('../middleware/authetication');

router.post('/',
    [
        check('email','Enter a valid email').isEmail(),
        check('password','Verify the password').not().isEmpty(),
    ],
    authController.authenticateUser
);

router.get('/',
    authentication,
    authController.getUserAuth
);

module.exports = router;