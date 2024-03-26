import express, { Request, Response } from 'express';
import { IAppContext } from '../../types/app';
import setContext from '../../middlewares/context';
import { appContext } from '../../start';
import user from './user.router'
import session from './session.router'

const router = express.Router()

router.use(user)
router.use(session)

export default router