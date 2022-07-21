const auth = require('../controller/authController')
const restrict = require('../middleware/restrict')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

// const cekAuth = (req, res, next) => {
//     if(req.user) {
//         next()
//     } else {
//         res.redirect('/login')
//     }
// }

router.get('/', function (req, res){
    res.send("Hello world")
})
router.post('/login', function (req, res, next) {
    if(req.user) {
        // res.redirect("/")
        res.json({success: true, message: "sudah login"})
    } else {
        next()
    }
}, bodyParser.json(), auth.postLogin)
router.post('/register', auth.postRegister)
router.get('/whoami', restrict, auth.getWhoami)

module.exports = router
