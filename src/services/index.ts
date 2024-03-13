import { IAppContext } from '../types/app';

//user
import UserService from './user';
import UserSessionService from './session';

export interface IServices {
  UserService: UserService;
  UserSessionService:UserSessionService;
}

export default async function initServices(context: IAppContext): Promise<IServices> {
  return {
    UserService: new UserService(context),
    UserSessionService: new UserSessionService(context),
  };
}
