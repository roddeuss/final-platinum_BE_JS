'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user,{foreignKey: 'id', as: 'user', unique:false})
      this.hasMany(models.productImage, {as: 'productImage'})
      this.hasMany(models.tawar, {as: 'tawar'})
    }
  }
  product.init({
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    images: DataTypes.ARRAY(DataTypes.STRING),
    isSold: DataTypes.BOOLEAN,
    publish: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};