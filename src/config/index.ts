import dotenv from 'dotenv';
import development from './development';
import production from './production';

export interface Config {
  app: {
    name: string;
    env: 'production' | 'development' | 'test';
    port: string | number;
  };

  db: {
    uri: string;
  };
  smtp: {
    user: string;
    pass: string;
    host: string;
    port: string;
    secure: boolean | string;
  };
  logger: {
    level: string;
  };
  paystack: {
    secret_key:string
  }
}

const config = process.env.NODE_ENV === 'development' ? development : production;

export default config;
