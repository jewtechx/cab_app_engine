import express, { Request, Response } from 'express';
import { IAppContext } from '../../types/app';
import setContext from '../../middlewares/context';
import { appContext, uploadAvatar } from '../../start';
import User from '../../models/user/user';

const router = express.Router();

router.get('/me',setContext,async (req: Request & { user: any }, res: Response) => {
  const user = await User.findOne({_id:req.user._id})
  res.status(200).json(user)
})

router.get('/users',setContext,async (_:any, res: Response) => {
  const user = await User.find()
  res.status(200).json(user)
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
router.delete('/deleteuser',setContext, async(req: Request & { user: any }, res: Response) => {
  try {
    const message = await appContext.services.UserService.deleteUser(req.user._id);
    res.status(201).json(message);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post('/uploadprofilepicture', setContext, async (req: Request & { user: any, file: { path: string } }, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    if (!user || !user.verified) {
      return res.status(500).send('User not verified');
    }

    uploadAvatar(req, res, async (err) => {
      if (err) {
        return res.status(500).send(err.message);
      }

      try {
        await user.updateOne({ $set: { profile: { avatar: req.file.path } } }, { new: true, upsert: true });
        await user.save();
        res.status(201).send('Avatar uploaded');
      } catch (e) {
        res.status(500).send('Error updating user profile');
      }
      res.status(201).send('Avatar uploaded');
    });
  } catch (e) {
    res.status(500).send('Error processing request');
  }
});


router.get('/getuserrating',setContext, async(req: Request & { user: any }, res: Response) => {
  try {
    const rating = await appContext.services.UserService.getUserRating(req.user._id);
    res.status(201).json(rating);
  } catch (e) {
    res.status(500).send('error getting user rating');
  }
});

export default router;
