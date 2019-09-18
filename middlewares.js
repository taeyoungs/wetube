import multer from 'multer';
import routers from './router';

const multerVideo = multer({dest: 'uploads/videos/'});

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = 'WeTube';
  res.locals.routes = routers;
  res.locals.user = req.user || null;
  next();
};

// single() : 1개의 파일만 선택가능
export const uploadVideo = multerVideo.single('videoFile');
