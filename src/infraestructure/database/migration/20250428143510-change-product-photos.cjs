'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('products', 'imageGallery', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false
    })

    await queryInterface.renameColumn('products', 'imageUrl', 'thumbnailUrl')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'imageGallery', {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false
    })

    await queryInterface.renameColumn('products', 'thumbnailUrl', 'imageUrl')
  }
};
