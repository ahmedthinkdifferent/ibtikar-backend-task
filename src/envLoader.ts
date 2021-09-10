import * as path from 'path';
const fs = require('fs');
const dotenv = require('dotenv');
export default async function() {
  const appEnvironment = process.env.NODE_ENV || 'local';
  const envConfig = dotenv.parse(fs.readFileSync(path.resolve(__dirname, `${appEnvironment}.env`)));
  for (const k in envConfig) {
    process.env[k] = envConfig[k];
  }
}