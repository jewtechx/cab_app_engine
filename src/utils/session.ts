import { Types } from 'mongoose';
import Session from '../models/user/session';
import { privateField } from '../models/user/user';
import { signJwt } from './token';
import { omit } from 'lodash'

const createSession = async function ({ userId }: { userId: Types.ObjectId }) {
  return await Session.create({ userId });
};

export async function signRefreshToken({ userId }: { userId: Types.ObjectId }) {
  const session = createSession({ userId });

  const payload = { session: (await session)._id };
  const refreshToken = signJwt(payload, {
    expiresIn: '1y',
    algorithm: 'RS256',
  });

  return refreshToken;
}

export async function signAccessToken(user: any) {
  const payload = omit(user.toJSON(), privateField);

  const accessToken = signJwt(payload, {
    expiresIn: '1d',
  });

  return accessToken;
}

export async function findSessionById(id: string) {
  return Session.findById(id);
}
