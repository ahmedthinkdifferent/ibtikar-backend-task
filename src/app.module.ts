import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TranslatorModule } from 'nestjs-translator';
import { HttpExceptionFilter } from './http/exceptions/expcetion-filter/HttpExceptionFilter';
import { DbModule } from './database/db.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './http/api/v1/auth/auth.module';
import { ProductsModule } from './http/api/v1/products/products.module';
import { OrdersModule } from './http/api/v1/orders/orders.module';

@Module({
  imports: [
    TranslatorModule.forRoot({
      global: true,
      defaultLang: 'en',
      translationSource: '/src/i18n',
    }),
    DbModule,
    SharedModule,
    AuthModule,
    ProductsModule,
    OrdersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  controllers: [],
})
export class AppModule {
}
