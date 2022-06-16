const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const {user} = require('../models')

function formatUser(user) {
    const {id, email} = user.dataValues
    return {
        id, email,
        access_token: user.generateToken(id, email)
    }
}

module.exports = {
    getLogin: (req, res) =>{
        res.json({message: "Masukkan Email dan Passowrd", success: true, data: {}})
    },
    postLogin: (req, res) =>{
        console.log(req.body)
        const {email, password} = req.body;
        user.authenticate(email, password)
        .then(status => {
            let test = formatUser(status)
            console.log(test)
            res.json(
                {message: "Login Berhasil", success: true, data: {test}}
            )
        })
        .catch(err => {
            res.json({message: "Login Gagal", success: false, data: {}})
        })
    }
}