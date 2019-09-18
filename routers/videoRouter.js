import express from 'express';
import routers from '../router';
import {
  getUpload,
  postUpload,
  videoDetail,
  deleteVideo,
  getEditVideo,
  postEditVideo,
} from '../controllers/videoController';
import {uploadVideo, onlyPrivate} from '../middlewares';

const videoRouter = express.Router();

// UPLOAD
videoRouter.get(routers.upload, onlyPrivate, getUpload);
videoRouter.post(routers.upload, onlyPrivate, uploadVideo, postUpload);

// VIDEO DETAIL
videoRouter.get(routers.videoDetail(), videoDetail);

// EDIT VIDEO
videoRouter.get(routers.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routers.editVideo(), onlyPrivate, postEditVideo);

// DELETE VIDEO
videoRouter.get(routers.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
