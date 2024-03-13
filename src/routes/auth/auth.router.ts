import express, { Request, Response } from 'express'
import { IAppContext } from '../../types/app';

export default function router(appContext:IAppContext){
    const router = express.Router()

    router.post('/register',(req:Request,res:Response) => {
        return appContext.services.UserService.registerUser(req.body);
    })

    return router

}