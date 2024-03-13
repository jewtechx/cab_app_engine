import dotenv from 'dotenv';
dotenv.config();
import { Config } from '.';

const config: Config = {
  app: {
    name: 'nestly-engine',
    port: 8080,
    env: 'development',
  },
  db: {
    uri: process.env.DEV_MONGO_URI || '',
  },
  smtp: {
    user: process.env.DEV_MAIL_USER,
    pass: process.env.DEV_MAIL_PASS,
    host: process.env.DEV_MAIL_HOST,
    port: process.env.DEV_MAIL_PORT ,
    secure: process.env.DEV_MAIL_SECURE || false
  },
    logger: {
    level: process.env.LOGGER_LEVEL
  },
  paystack: {
    secret_key:process.env.PAYSTACK_TEST_SECRET_KEY || ''
  }
  
};

export default config;
