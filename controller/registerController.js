const bcrypt = require('bcrypt');
const { user } = require('../models');

function formatuser1(user) {
    const { nama, email, password } = user.dataValues;
    return {
      nama,
      email,
      password,
      access_token: user.generateToken(nama, email, password),
    };
  }

module.exports = {
get_Register: (req, res) => {
    res.json({
      message: 'Masukkan Nama, Email, Password',
      success: true,
      data: {},
    });
  },
  post_Register: (req, res) => {
    console.log(req.body);
    
    const { nama, email, password } = req.body;
    user
      .authenticate(nama, email, password)
      .then((status) => {
        let test1 = formatuser1(status);
        console.log(test1);
        res.json({
          message: 'Register Berhasil',
          success: true,
          data: { test1 },
        });
      })
      .catch((err) => {
        res.json({ message: 'Register Gagal', success: false, data: {} });
      });
  }
};