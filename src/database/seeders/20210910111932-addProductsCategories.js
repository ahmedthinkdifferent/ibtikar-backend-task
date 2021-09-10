'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('ProductsCategories', [
      {
        name: 'لاب توب',
      },
      {
        name: 'ساعات',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ProductsCategories', null, {});
  },
};
