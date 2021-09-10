import { JwtModule } from '@nestjs/jwt';
import EncryptService from './EncryptService';
import { HttpResponse } from './HttpResponse';
import { JwtAuthService } from './JwtAuthService';
import { AppLogger } from './app-logger.service';
import { Global, Module } from '@nestjs/common';

const providers = [HttpResponse, JwtAuthService, AppLogger, EncryptService];

const imports = [
  JwtModule.registerAsync({
    useFactory: () => ({
      secret:
        'zupM2Ssji2Q/Hd0fo4Z3K8m4c2NdYtkAPnc0sdmnae7CyMiyVY6BxvoffRSqgWzi4Kqp6bxGAuIw7LvBkNUIyA==',
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
