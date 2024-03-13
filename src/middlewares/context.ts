import { verifyJwt } from '../utils/token';

export const setContext = async ({ req }) => {
  try {
    const token = req.headers.authorization || '';
    
    if (token) {
      const decoded: any = await verifyJwt(token);

      const id = decoded._id;

      const user = { _id: id };

      return { user };
    }
  } catch (err) {
    console.log(err);
  }
};
