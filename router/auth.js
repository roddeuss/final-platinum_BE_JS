const auth = require('../controller/authController')
const restrictLocal = require('../middleware/restrict-local')
const express = require('express')
const router = express.Router()

const cekSession = (req, res, next) => {
    if(req.session.userId) {
        next()
    } else {
        res.redirect('/login')
    }
}

router.get('/', cekSession, function (req, res){
    let userLog = req.session.userId
    res.json({message: `Halaman Home ${userLog}`, success: true, data: { userLog }})
})
router.get('/login', function (req, res, next) {
    if(req.session.userId) {
        res.redirect("/")
    } else {
        next()
    }
}, auth.getLogin)
router.post('/login', function (req, res, next) {
    if(req.session.userId) {
        res.redirect("/")
    } else {
        next()
    }
}, auth.postLogin)
router.post('/logout', auth.logout)

module.exports = router
