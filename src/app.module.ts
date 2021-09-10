import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TranslatorModule } from 'nestjs-translator';
import { HttpExceptionFilter } from './http/exceptions/expcetion-filter/HttpExceptionFilter';
import { DbModule } from './database/db.module';

@Module({
  imports: [
    TranslatorModule.forRoot({
      global: true,
      defaultLang: 'en',
      translationSource: '/src/i18n',
    }),
    DbModule,
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
