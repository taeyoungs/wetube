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
import {uploadVideo} from '../middlewares';

const videoRouter = express.Router();

// UPLOAD
videoRouter.get(routers.upload, getUpload);
videoRouter.post(routers.upload, uploadVideo, postUpload);

// VIDEO DETAIL
videoRouter.get(routers.videoDetail(), videoDetail);

// EDIT VIDEO
videoRouter.get(routers.editVideo(), getEditVideo);
videoRouter.post(routers.editVideo(), postEditVideo);

// DELETE VIDEO
videoRouter.get(routers.deleteVideo(), deleteVideo);

export default videoRouter;
