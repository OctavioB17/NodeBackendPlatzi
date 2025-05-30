'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'thumbnailUrl');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'thumbnailUrl', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
    });
  }
};
