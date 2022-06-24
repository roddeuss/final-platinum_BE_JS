'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.product, { foreignKey: 'productId', as: 'product', unique: false })
    }
  }
  wishlist.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'wishlist',
  });
  return wishlist;
};