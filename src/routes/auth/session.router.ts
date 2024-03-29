import express, { Request, Response } from 'express';
import { appContext } from '../../start';

const router = express.Router()

router.post('/session/create',async (req:Request,res:Response) => {
    try{
        const tokens = await appContext.services.UserSessionService.createUserSession(req.body)
        res.cookie('access-token',tokens.accessToken)
        res.status(201).json({message:'token sent as a cookie'})
    }catch(e){
        res.status(500).send('Error creating token')
    }

})

router.get('/session/getrefreshtoken', async (req:Request,res:Response) => {
    try{
        const tokens = await appContext.services.UserSessionService.createUserSession(req.body)
        res.cookie('refresh-token',tokens.refreshToken)
        res.status(201).json({message:'token sent as a cookie'})
    }catch(e){
        res.status(500).send('Error creating token')
    }
})

router.post('/session/refresh',async (req:Request,res:Response) => {
    try{
        const token = await appContext.services.UserSessionService.refreshAccessToken(req.cookies['refresh-token'])
        res.cookie('access-token',token.accessToken)
        res.status(201).json({message:'tokens sent as cookies'})
    }catch(e){
        res.status(500).send('Error creating token')
    }

})


export default router