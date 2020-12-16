const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { check } = require('express-validator');

router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Enter a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters length').isLength({ min: 6}),
    ],
        userController.createUser
);

module.exports = router;