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
      // this.belongsTo(models.user, { foreignKey: 'id', as: 'user', unique: false })
      this.belongsTo(models.product, { foreignKey: 'productId', as: 'product', unique: false })

      this.hasMany(models.tawar, {as: 'tawar'})
    }
  }
  transaksi.init({
    buyer_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaksi',
  });
  return transaksi;
};