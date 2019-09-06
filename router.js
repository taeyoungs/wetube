// Global

const HOME = '/';
const JOIN = '/join';
const LOGIN = '/login';
const LOGOUT = '/logout';
const SEARCH = '/search';

// Users

const USERS = '/users';
const USER_DETAIL = '/:id';
const EDIT_PROFILE = '/:id/edit-profile';
const CHANGE_PASSWORD = '/:id/change-profile';

// Videos

const VIDEOS = '/videos';
const UPLOAD = '/upload';
const VIDEO_PROFILE = '/:id';
const EDIT_VIDEO = '/:id/edit';
const DELETE_VIDEO = '/:id/delete';

const routers = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  users_detail: USER_DETAIL,
  edit_profile: EDIT_PROFILE,
  change_password: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  video_profile: VIDEO_PROFILE,
  edit_video: EDIT_VIDEO,
  delete_video: DELETE_VIDEO,
};

export default routers;
