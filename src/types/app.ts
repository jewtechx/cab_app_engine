import { IModels } from '../models';
import { IServices } from '../services';
export interface IAppContext {
  models?: IModels;
  services?: IServices;
}

export default class IService {
  models?: IModels;
  context?: IAppContext;
  constructor(context: IAppContext) {
    this.models = context.models;
    this.context = context;
  }

  async authenticate_user(userId: any) {
    const user = await this.context.models.User.findOne({ _id: userId });

    if (!user) {
      throw new Error('User not authenticated');
    }

    return user
  }

}
