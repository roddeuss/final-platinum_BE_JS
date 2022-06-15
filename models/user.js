'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
    number_mobile: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};