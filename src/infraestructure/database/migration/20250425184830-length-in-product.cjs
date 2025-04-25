'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'length', {
      type: Sequelize.FLOAT,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'length', {
      type: Sequelize.FLOAT,
      allowNull: true
    });
  }
};
