'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProductImages', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true,
      },
      productId: {
        type: Sequelize.INTEGER,
        onDelete: 'NO ACTION',
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id',
        },
      },
      image: {
        type: Sequelize.STRING(250),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        ),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProductImages');
  },
};
