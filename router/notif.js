const express = require('express')
const router = express.Router()
const restrict = require('../middleware/restrict')
const notif = require('../controller/notifController')

router.get('/notif', restrict, notif.getNotif)

module.exports = router