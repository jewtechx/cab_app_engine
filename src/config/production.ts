import dotenv from 'dotenv';
dotenv.config();
import { Config } from '.';

const config: Config = {
  app: {
    name: 'nestly-engine',
    port: process.env.PORT || 8080,
    env: 'production',
  },
  db: {
    uri: process.env.PROD_MONGO_URI || '',
  },
  smtp: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE || true,
  },
  logger: {
    level: process.env.LOGGER_LEVEL,
  },
  paystack: {
    secret_key: process.env.PAYSTACK_LIVE_SECRET_KEY || ''
  }
};

export default config;
