import express from 'express';
import routers from '../router';
import {
  users,
  userDetail,
  editProfile,
  changePassword,
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/', users);
userRouter.get(routers.editProfile, editProfile);
userRouter.get(routers.changePassword, changePassword);
userRouter.get(routers.userDetail(), userDetail);

export default userRouter;
