'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    checkPassword = (password, db_password) => {
      return bcrypt.compareSync(password, db_password)
    }
    
    generateToken = (id, email) => {
      const payload = {
        id, email
      }
      console.log(payload);
      const rahasia = "Ini sangat rahasia"
      const token = jwt.sign(payload, rahasia, {expiresIn: '1d'})
      return token;
    }

    static authenticate = async ( email, password ) => {
      try {
        const userLog = await this.findOne({ where: {email}})
        if(!userLog) return Promise.reject("Email not found!")
        const isPasswordValid = await userLog.checkPassword(password, userLog.password)
        if(!isPasswordValid) return Promise.reject("Wrong Password!")

        return Promise.resolve(userLog)
      } catch (error) {
        return Promise.reject(error)        
      }
    }

    static associate(models) {
      this.hasMany(models.product, {as: 'product'})
      this.hasMany(models.notifProduct, {as: 'notifProduct'})
    }

    static #encrypt = (password) => {
      return bcrypt.hashSync(password, 10)
    }
    static register = (res, name, email, password) => {
      const encryptedPassword = this.#encrypt(password)
      console.log(name, email, encryptedPassword)
      this.findOne({where :{email}})
      .then((found) => {
        if(found == null){
          return this.create({name, email, password: encryptedPassword})
          .then((data) => {
            res.json({message: "Register Berhasil", success: true, data})
          }).catch((error) => {
            console.log(error)
            res.json({message: "Register Gagal", success: false, data: {}})
          })
        } else {
          return res.json({message: "Email sudah digunakan", success: false, data:{}})
        }
      })
    }
  }
  user.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.TEXT,
    otp: DataTypes.TEXT,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
    image: DataTypes.STRING,
    number_mobile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};