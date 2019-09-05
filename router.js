import express from 'express';

export const userRouter = express.Router();

const handlePassword = (req, res) => res.send('user password');

userRouter.get('/', (req, res) => res.send('user index'));
userRouter.get('/edit', (req, res) => res.send('user edit'));
userRouter.get('/password', handlePassword);
