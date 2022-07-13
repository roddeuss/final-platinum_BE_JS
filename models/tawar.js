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
      this.hasMany(models.notifProduct, {as: 'notifProduct'})
      this.belongsTo(models.product, { foreignKey: 'productId', as: 'product', unique: false })
      this.belongsTo(models.user, { foreignKey: 'userId', as: 'user', unique: false })
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