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
        email: 'user@user.com',
        password: hash('user'),
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
