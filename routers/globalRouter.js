import express from 'express';
import routers from '../router';
import {home, search} from '../controllers/videoController';
import {login, logout, getJoin, postJoin} from '../controllers/userController';

const globalRouter = express.Router();

globalRouter.get(routers.join, getJoin);
globalRouter.post(routers.join, postJoin);

globalRouter.get(routers.home, home);
globalRouter.get(routers.search, search);
globalRouter.get(routers.login, login);
globalRouter.get(routers.logout, logout);

export default globalRouter;
