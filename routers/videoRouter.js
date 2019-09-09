import express from 'express';
import routers from '../router';
import {
  upload,
  video_profile,
  edit_video,
  delete_video,
} from '../controllers/videoController';

const videoRouter = express.Router();

videoRouter.get(routers.upload, upload);
videoRouter.get(routers.video_profile, video_profile);
videoRouter.get(routers.edit_video, edit_video);
videoRouter.get(routers.delete_video, delete_video);

export default videoRouter;
