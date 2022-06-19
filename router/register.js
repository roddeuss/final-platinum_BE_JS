const register = require('../controller/registerController');
const express = require('express');
const router = express.Router();

router.get('/register', register.get_Register);
router.post('/register', register.post_Register);

module.exports = router;