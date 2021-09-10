import { Injectable } from '@nestjs/common';

@Injectable()
export class AppLogger {
  logError(exception: Error) {
    const nodeEnv = process.env.NODE_ENV || 'local';
    if (nodeEnv === 'local') {
      console.error(exception);
    } else {
      // log to sentry
    }
  }
}
