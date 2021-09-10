import { Injectable } from "@nestjs/common";
import * as Sentry from "@sentry/node";
import { AppEnvironments } from "../constant/AppEnvironments";

Sentry.init({
  dsn: "https://9e3b6fd9660546e4bcacd90caadcbace@o941230.ingest.sentry.io/5890188",
  tracesSampleRate: 1.0,
  attachStacktrace: true,
  environment: process.env.NODE_ENV,
  serverName: require("os").hostname(),
  release: process.env.RELEASE_NUMBER
});

@Injectable()
export class AppLogger {

  logError(exception: Error) {
    const nodeEnv = process.env.NODE_ENV || "local";
    if (nodeEnv === AppEnvironments.LOCAL) {
      console.error(exception);
    } else {
      // log to sentry
      Sentry.captureException(exception);
    }
  }
}