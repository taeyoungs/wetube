import express from 'express';
import routers from '../router';
import {
  userDetail,
  editProfile,
  changePassword,
} from '../controllers/userController';
import {onlyPrivate} from '../middlewares';

const userRouter = express.Router();

userRouter.get(routers.editProfile, onlyPrivate, editProfile);
userRouter.get(routers.changePassword, onlyPrivate, changePassword);
userRouter.get(routers.userDetail(), userDetail);

export default userRouter;
