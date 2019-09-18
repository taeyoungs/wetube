import express from 'express';
import routers from '../router';
import {home, search} from '../controllers/videoController';
import {
  getLogin,
  logout,
  getJoin,
  postJoin,
  postLogin,
} from '../controllers/userController';

const globalRouter = express.Router();

globalRouter.get(routers.join, getJoin);
globalRouter.post(routers.join, postJoin, postLogin);

globalRouter.get(routers.login, getLogin);
globalRouter.post(routers.login, postLogin);

globalRouter.get(routers.home, home);
globalRouter.get(routers.search, search);
globalRouter.get(routers.logout, logout);

export default globalRouter;
