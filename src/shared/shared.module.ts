import { JwtModule } from '@nestjs/jwt';
import EncryptService from './EncryptService';
import { HttpResponse } from './HttpResponse';
import { JwtAuthService } from './JwtAuthService';
import { AppLogger } from './AppLogger';
import { Global, Module } from '@nestjs/common';

const providers = [HttpResponse, JwtAuthService, AppLogger, EncryptService];

const imports = [
  JwtModule.registerAsync({
    useFactory: () => ({
      secret: process.env.JWT_SECRET,
    }),
  }),
];

@Module({
  imports: imports,
  providers: providers,
  exports: providers,
})
@Global()
export class SharedModule {}
