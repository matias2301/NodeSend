const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { check } = require('express-validator');

router.post('/',
    [
        check('email','Enter a valid email').isEmail(),
        check('password','Verify the password').not().isEmpty(),
    ],
    authController.authenticateUser
);

router.get('/',
    authController.getUserAuth
);

module.exports = router;