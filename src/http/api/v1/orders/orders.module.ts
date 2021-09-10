import { Module } from '@nestjs/common';
import OrderController from './controllers/OrderController';
import { OrderService } from './services/OrderService';

@Module({
  controllers:[OrderController],
  providers:[OrderService]
})
export class OrdersModule {}
