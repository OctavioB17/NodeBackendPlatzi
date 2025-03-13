'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'products', {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
    });

    await queryInterface.changeColumn('users', 'role', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'user'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'products');
    await queryInterface.changeColumn('users', 'role', {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: 'user'
    });
  }
};