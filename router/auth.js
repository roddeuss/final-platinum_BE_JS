const auth = require('../controller/authController')
const restrict = require('../middleware/restrict')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const cekAuth = (req, res, next) => {
    if(req.user) {
        next()
    } else {
        res.redirect('/login')
    }
}

router.get('/', cekAuth, function (req, res){
    let userLog = req.session.userId
    res.json({message: `Halaman Home ${userLog}`, success: true, data: { userLog }})
})
router.get('/login', function (req, res, next) {
    if(req.user) {
        res.redirect("/")
    } else {
        next()
    }
}, auth.getLogin)
router.post('/login', function (req, res, next) {
    if(req.user) {
        res.redirect("/")
    } else {
        next()
    }
}, bodyParser.json(), auth.postLogin)
router.post('/logout', auth.logout)
router.get('/postLogout', auth.logout)
router.get('/register', auth.getRegister)
router.post('/register', auth.postRegister)

router.get('/whoami', restrict, auth.getWhoami)

module.exports = router
