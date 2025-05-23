'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.addColumn('categories', 'imageUrl', {
        type: Sequelize.STRING,
        allowNull: false,
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('categories', 'imageUrl');
  }
};
