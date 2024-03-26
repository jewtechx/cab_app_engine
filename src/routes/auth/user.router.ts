import express, { Request, Response } from 'express';
import { IAppContext } from '../../types/app';
import setContext from '../../middlewares/context';
import { appContext } from '../../start';

const router = express.Router();

router.get('/me',setContext,async (req: Request & { user: any }, res: Response) => {
  res.status(200).json(req.user)
})

router.post('/register', async (req: Request, res: Response) => {
  try {
    const user = await appContext.services.UserService.registerUser(req.body);
    res.status(201).json({ user });
  } catch(e) {
    res.status(500).send('error creating user');
  }
});
router.post('/verify', async(req: Request, res: Response) => {
  try {
    const response = await appContext.services.UserService.verifyUser(req.body);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).send('error verifying user');
  }
});
router.post('/forgotpassword', async(req: Request, res: Response) => {
  try {
    const response = await appContext.services.UserService.forgotPassword(req.body);
    res.status(200).json(response);
  } catch (e) {
    res.status(500).send('error reseting password');
  }
});
router.post('/resetpassword', async(req: Request, res: Response) => {
  try {
    const response = await appContext.services.UserService.resetPassword(req.body);
    res.status(200).json(response);
  } catch (e) {
    res.status(500);
  }
});
router.post('/login', async(req: Request, res: Response) => {
  try {
    const user = await appContext.services.UserService.loginUser(req.body);
    res.status(200).json(user);
  } catch (e) {
    res.status(500);
  }
});
router.put('/updateuser', setContext, async(req: Request & { user: any }, res: Response) => {
  try {
    const user = await appContext.services.UserService.updateUser(req.body, req.user._id);
    res.status(200).json(user);
  } catch (e) {
    res.status(500);
  }
});
router.delete('/deleteuser', (req: Request & { user: any }, res: Response) => {
  try {
    const message = appContext.services.UserService.deleteUser(req.user);
    res.status(201).json(message);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
router.post('/updateprofilepicture', (req: Request & { user: any }, res: Response) => {
  try {
    const message = appContext.services.UserService.updateProfilePicture(req.user);
    res.status(201).json(message);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
router.get('/getuserrating', (req: Request & { user: any }, res: Response) => {
  try {
    const rating = appContext.services.UserService.getUserRating(req.user);
    res.status(201).json(rating);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

export default router;
