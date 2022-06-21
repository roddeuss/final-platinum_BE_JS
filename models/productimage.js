'use strict';
const {
  Model
} = require('sequelize');
// const product = require('./product');
module.exports = (sequelize, DataTypes) => {
  class productImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.product, {foreignKey: 'id', as: 'product', unique:false})
    }
  }
  productImage.init({
    productId: DataTypes.INTEGER,
    image: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'productImage',
  });
  return productImage;
};