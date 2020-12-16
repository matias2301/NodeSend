const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { check } = require('express-validator');

router.post('/',
    authController.authenticateUser
);

router.get('/',
    authController.getUserAuth
);

module.exports = router;