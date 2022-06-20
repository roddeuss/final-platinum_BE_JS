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
      tawar.belongsTo(models.product, { foreingKey: 'id', as: 'product' })
    }
  }
  tawar.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'tawar',
  });
  return tawar;
};