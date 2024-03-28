import { connect } from 'mongoose';
import { Config } from '../config';
import log from '../utils/log';

// user
import User from './user/user';
// ride
import Ride from './ride';


export interface IModels {
  User: typeof User;
  Ride: typeof Ride;
}

export default async function initDB(config: Config['db']): Promise<IModels> {
  try {
    await connect(config.uri, { autoIndex: true });
    log.info('Connected to database successfully');

    await User.createCollection();
    await Ride.createCollection();

    return {
      User,
      Ride
    };
  } catch (e) {
    throw new Error(`Error while connecting to database : ${e}`);
  }
}