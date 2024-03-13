import { connect } from 'mongoose';
import { Config } from '../config';
import log from '../utils/log';

// user
import User from './user/user';

//image
import Image from './image';

export interface IModels {
  User: typeof User;
  Image: typeof Image
}

export default async function initDB(config: Config['db']): Promise<IModels> {
  try {
    await connect(config.uri, { autoIndex: true });
    log.info('Connected to database successfully');

    await User.createCollection();
    await Image.createCollection();

    return {
      User,
      Image
    };
  } catch (e) {
    throw new Error(`Error while connecting to database : ${e}`);
  }
}