'use strict';
const products = [{
  name: 'لينوفو X360 فليكس 3 نوت بوك ، ايه ام دي اثلون3050U، 11.5 انش ، 128 اس اس دي ، 4 جيجا رام ، تاتش ، ازرق',
  price: 10000,
  categoryId: 1,
  images: ['https://www.rayashop.com/media/catalog/product/7/8/78d374e1-ff31-4cbf-8b68-194db8d32592.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700'],
},
  {
    name: 'لابتوب اتش بي 15-dw3021nia، انتل كور i5-1135G7، شاشة 15.6 انش اتش دي، 256 جيجابايت، 4 جيجا رام، نفيديا 2 جيجابايت MX350، دوس',
    price: 12500,
    categoryId: 1,
    images: ['https://www.rayashop.com/media/catalog/product/d/w/dw3021nia.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700'],
  },
  {
    name: 'نوت بوك تويست بلس من سارى ، 13.3 انش، انتل سيليرن ان3000 ،64 جيجابايت ،4 جيجا رام ،ويندوز 10 -فضى',
    price: 18000,
    categoryId: 1,
    images: ['https://www.rayashop.com/media/catalog/product/t/w/twist_plus.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700'],
  },
  {
    name: 'ساعة ذكية لتتبع اللياقة البدنية وحزام مغناطيسي للنساء - فضي',
    price: 5700,
    categoryId: 2,
    images: ['https://www.rayashop.com/media/catalog/product/0/d/0d8d91694b4bb791d3a4e650d6f6.jpg?optimize=high&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700'],
  },
  {
    name: 'ساعة ذكية لتتبع اللياقة البدنية وحزام مغناطيسي للنساء - روز جولد',
    price: 400,
    categoryId: 2,
    images: ['https://www.rayashop.com/media/catalog/product/f/i/file_88_2.png?format=jpeg'],
  },
];
module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (let product of products) {
      const insertedProduct = await queryInterface.sequelize.query('insert into Products (name, price, categoryId) values (?,?,?)', {
        type: Sequelize.QueryTypes.INSERT,
        replacements: [product.name, product.price, product.categoryId],
        plain: true, raw: true,
      });
      const productId = insertedProduct[0];
      for (let image of product.images) {
        await queryInterface.sequelize.query('insert into ProductImages (productId, image) values (?,?)', {
          type: Sequelize.QueryTypes.INSERT,
          replacements: [productId, image],
        });
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ProductImages', null, {});
    await queryInterface.bulkDelete('Products', null, {});
  },
};
