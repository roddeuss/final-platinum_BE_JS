const auth = require('../controller/authController')
const express = require('express')
const router = express.Router()

router.get('/login', auth.getLogin)
router.post('/login', auth.postLogin)

module.exports = router
