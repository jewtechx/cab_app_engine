import jwt from 'jsonwebtoken';

const jwt_token = process.env.JWT_TOKEN

export function signJwt(object: object, options?: jwt.SignOptions): string {
  return jwt.sign(object, jwt_token, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

export function verifyJwt<T>(token: string): T {
  try {
    const decoded = jwt.verify(token, jwt_token) as T;
    return decoded;
  } catch (e) {
    throw e;
  }
}
