'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tawar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.user, {foreignKey: 'id' , as: 'user', unique: false})
      this.belongsTo(models.product, {foreignKey: 'id' , as: 'product', unique: false})
    }
  }
  tawar.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tawar',
  });
  return tawar;
};