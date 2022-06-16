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
      const token = jwt.sign(payload, rahasia)
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
      // define association here
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