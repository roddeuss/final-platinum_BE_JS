'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notifProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.product, {foreignKey: 'productId', as: 'product', unique:false})
      this.belongsTo(models.user, {foreignKey: 'userId', as: 'user', unique:false})
    }
  }
  notifProduct.init({
    productId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    tawar: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'notifProduct',
  });
  return notifProduct;
};