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
import {onlyPublic} from '../middlewares';

const globalRouter = express.Router();

globalRouter.get(routers.join, onlyPublic, getJoin);
globalRouter.post(routers.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routers.login, onlyPublic, getLogin);
globalRouter.post(routers.login, onlyPublic, postLogin);

globalRouter.get(routers.home, home);
globalRouter.get(routers.search, search);
globalRouter.get(routers.logout, logout);

export default globalRouter;
