import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import userRouter from './routers/userRouter';
import videoRouter from './routers/videoRouter';
import globalRouter from './routers/globalRouter';
import routers from './router';
import {localMiddleware} from './middlewares';

const app = express();

app.use(helmet());
app.set('view engine', 'pug');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(localMiddleware);

app.use(routers.home, globalRouter);
app.use(routers.users, userRouter);
app.use(routers.videos, videoRouter);

export default app;