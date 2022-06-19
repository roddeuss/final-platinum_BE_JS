'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //  transaksi.belongsTo(models.user, {foreingKey: 'id', as: 'user', unique: false}) 
      transaksi.belongsTo(models.product, { foreingKey: 'id', as: 'product' })
    }
  }
  transaksi.init({
    user_id: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaksi',
  });
  return transaksi;
};