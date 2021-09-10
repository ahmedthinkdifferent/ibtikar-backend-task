import { Global, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

const models = [];
const repositories = [];
const imports = [
  SequelizeModule.forRoot({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: true,
    models: models,
  }),
];

@Module({
  imports: imports,
  providers: repositories,
  exports: repositories,
})
@Global()
export class DbModule {}
