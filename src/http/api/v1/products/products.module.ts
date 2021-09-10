import { Module } from '@nestjs/common';
import ProductController from './controllers/ProductController';

@Module({
  controllers: [ProductController],
})
export class ProductsModule {
}
