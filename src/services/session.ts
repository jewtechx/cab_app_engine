import { verifyJwt } from '../utils/token';
import { findSessionById, signAccessToken, signRefreshToken } from '../utils/session';

import IService, { IAppContext } from "../types/app";

export default class UserSessionService extends IService{
    constructor(props:IAppContext){
        super(props)
    }
      // creates access tokens
  async createUserSession(_id:any) {

    const {id} = _id
    const user = await this.models.User.findById(id);
    
    if (!user) {
      throw new Error('Invalid id or password');
    }
    
    if (!user.verified) {
      throw new Error('Please verify your phoneNumber');
    }
    
    const accessToken = await signAccessToken(user);
    
    const refreshToken = await signRefreshToken({ userId: user._id });
    
    return {
      accessToken,
      refreshToken,
    };
  }

  // refreshes access tokens
  async refreshAccessToken(token:string) {
    const decoded = await verifyJwt<{ session: string }>(token);

    if (!decoded) {
      throw new Error('Could not refresh access token');
    }

    const session = await findSessionById(decoded.session);

    if (!session || !session.valid) {
      throw new Error('Could not refresh access token');
    }

    const user = await this.models.User.findById(String(session.userId));

    if (!user) {
      throw new Error('Could not refresh access token');
    }

    const accessToken = signAccessToken(user);

    return { accessToken };
  }

}