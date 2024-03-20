import express, { Request, Response } from 'express'
import { IAppContext } from '../../types/app';
import setContext from '../../middlewares/context';

export default function router(appContext:IAppContext){
    const router = express.Router()

    router.post('/register',(req:Request,res:Response) => {
        return appContext.services.UserService.registerUser(req.body);
    })
    router.post('/verify',(req:Request,res:Response) => {
        return appContext.services.UserService.verifyUser(req.body);
    })
    router.post('/forgotpassword',(req:Request,res:Response) => {
        return appContext.services.UserService.forgotPassword(req.body);
    })
    router.post('/resetpassword',(req:Request,res:Response) => {
        return appContext.services.UserService.resetPassword(req.body);
    })
    router.post('/login',(req:Request,res:Response) => {
        return appContext.services.UserService.loginUser(req.body);
    })
    router.put('/update',setContext,(req:Request & {user:any},res:Response) => {
        return appContext.services.UserService.updateUser(req.body,req.user._id);
    })
    router.delete('/deleteuser',(req:Request  & {user:any},res:Response) => {
        return appContext.services.UserService.deleteUser(req.user);
    })
    router.post('/updateprofilepicture',(req:Request  & {user:any},res:Response) => {
        return appContext.services.UserService.updateProfilePicture(req.user);
    })
    router.get('/getuserrating',(req:Request  & {user:any},res:Response) => {
        return appContext.services.UserService.getUserRating(req.user);
    })


    return router

}