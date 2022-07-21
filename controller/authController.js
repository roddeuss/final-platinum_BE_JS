const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
const {user} = require('../models')
const passport = require("../lib/passport");
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const express = require('express');
const app = express();
let session;

function formatUser(user) {
    const {id, email} = user.dataValues
    return {
        id, email,
        access_token: user.generateToken(id, email)
    }
}

module.exports = {
    postLogin: (req, res) =>{
        console.log(req.body)
        const {email, password} = req.body;
        user.authenticate(email, password)
        .then(status => {
            let test = formatUser(status)
            res.json({message: "Login Berhasil", success: true, data: {test}})
        })
        .catch(err => {
            res.json({message: err.message, success: false, data: {}})
        })
    },
    login: passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }),
    postRegister: (req, res) => {
        const {name, email, password} = req.body;
        console.log(req.body)
        if(!(name && email && password)) {
            return res.json({message: "Beberapa data kosong", success: false, data: {}})
        }
        user.register(res, name, email, password)
    },
    getWhoami: (req, res) => {
        res.json(req.user)
    }
}