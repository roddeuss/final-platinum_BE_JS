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
    getLogin: (req, res) =>{
        res.render('views/login')
        // res.json({message: "Masukkan Email dan Password", success: true, data: {}})
    },
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
    logout: (req,res) => {
        // req.session.cookie.maxAge = 0
        // req.session.cookie.expires = Date.now()
        // req.session.userId = null;
        // console.log(req.session)
        // req.session.destroy();
        console.log(req.session)
        res.clearCookie('connect.sid');
        // req.session.destroy();
        console.log(req.session)
        res.json({message: 'Logout Berhasil', success: true, data: {}});
    },
    getRegister: (req, res) => {
        res.json({message: "Masukkan Nama, Email, dan Password", success: true, data: {}})
    },
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