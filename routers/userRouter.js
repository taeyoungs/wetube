import express from 'express';
import routers from '../router';
import {
  users,
  users_detail,
  edit_profile,
  change_password,
} from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/', users);
userRouter.get(routers.edit_profile, edit_profile);
userRouter.get(routers.change_password, change_password);
userRouter.get(routers.users_detail, users_detail);

export default userRouter;
