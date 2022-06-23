'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let seedTawar = [
      {
        id: 1,
        userId: 2,
        productId: 1,
        price: 100000,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ]
    return queryInterface.bulkInsert('tawars', seedTawar)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
