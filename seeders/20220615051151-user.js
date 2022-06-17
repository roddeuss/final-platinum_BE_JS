'use strict';

const bcrypt = require('bcrypt');
const hash = (password) => {
  return bcrypt.hashSync(password, 10);
}
module.exports = {
  async up (queryInterface, Sequelize) {
    let seedUser = [
      {
        id: 1,
        name: 'John',
        email: 'user@user.com',
        password: hash('user'),
        city: 'Kota Konoha',
        address: 'Jl. Jalan',
        image: 'profile.jpg',
        number_mobile: '081234568910',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        email: 'test@test.com',
        password: hash('test'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ]
    return queryInterface.bulkInsert('users', seedUser)
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
