'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    let seedProduct = [
      {
        id: 1,
        userId: 1,
        name: "Jam Wumbo Jumbo",
        category: "Jam Tangan",
        price: 150000,
        description: "Jam peninggalan zaman firaun",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 1,
        name: "Sepatu Kaca",
        category: "Sepatu",
        price: 2000000,
        description: "Sepatu baru beli 1 minggu",
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ]
    return queryInterface.bulkInsert('products', seedProduct)
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
