import express, { Request, Response } from 'express';
import { IAppContext } from '../../types/app';
import setContext from '../../middlewares/context';
import { appContext } from '../../start';

const router = express.Router()

router.post('/session/create',async (req:Request,res:Response) => {
    try{
        const tokens = await appContext.services.UserSessionService.createUserSession(req.body)
        res.status(201).json(tokens)
    }catch(e){
        res.status(500)
    }

})

router.post('/session/refresh',async (req:Request,res:Response) => {
    try{
        const token = await appContext.services.UserSessionService.refreshAccessToken(req.body)
        res.status(201).json(token)
    }catch(e){
        res.status(500)
    }

})


export default router