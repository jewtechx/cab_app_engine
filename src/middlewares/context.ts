import { NextFunction } from 'express';
import { verifyJwt } from '../utils/token';
import { JwtPayload } from 'jsonwebtoken';
import { Request,Response } from 'express';

interface AuthRequest extends Request 
{
  user?: JwtPayload
}

export default async function setContext (req:AuthRequest,res:Response,next:NextFunction){
  try {
    const token = req.headers.authorization || '';
    
    if (token) {
      const decoded: any = await verifyJwt(token.split(' ')[1]);

      const id = decoded._id;

      const user = { _id: id };

      req.user = user;
      next()
    }
  } catch (err) {
    console.log(err);
  }
};
