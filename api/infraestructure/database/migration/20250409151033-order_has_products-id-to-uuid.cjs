'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('order_has_products', 'id', {
        type: Sequelize.UUID,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: false
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('order_has_products', 'id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    })
  }
};
