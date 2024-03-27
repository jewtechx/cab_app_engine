import { NextFunction } from 'express';
import { verifyJwt } from '../utils/token';
import { Request,Response } from 'express';

export default async function setContext (req:Request & {user:{_id:string}},res:Response,next:NextFunction){
  try {
    let token
    req.cookies['access-token'] ? token = req.cookies['access-token'] : '';
    
    if (token) {
      const decoded: any = await verifyJwt(token);
      
      const id = decoded._id;
      console.log(id,decoded)
      
      const user = { _id: id };
      user ? req.user = user : null;
      next()
    }
  } catch (err) {
    console.log(err);
  }
};
