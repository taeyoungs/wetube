// Global

const HOME = '/';
const JOIN = '/join';
const LOGIN = '/login';
const LOGOUT = '/logout';
const SEARCH = '/search';
const ME = '/myProfile';

// Users

const USERS = '/users';
const USER_DETAIL = '/:id';
const EDIT_PROFILE = '/edit-profile';
const CHANGE_PASSWORD = '/change-profile';

// Videos

const VIDEOS = '/videos';
const UPLOAD = '/upload';
const VIDEO_PROFILE = '/:id';
const EDIT_VIDEO = '/:id/edit';
const DELETE_VIDEO = '/:id/delete';

// Github
const GITHUB = '/auth/github';
const GITHUB_CALLBACK = '/auth/github/callback';

// Facebook
const FB = '/auth/facebook';
const FB_CALLBACK = '/auth/facebook/callback';

// Kakao
const KAKAO = '/auth/kakao';
const KAKAO_CALLBACK = '/oauth';

// Instagram
const INSTA = '/auth/instagram';
const INSTA_CALLBACK = '/auth/instagram/callback';

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  userDetail: id => {
    if (id) {
      return `/users/${id}`;
    }
    return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: id => {
    if (id) {
      return `/videos/${id}`;
    }
    return VIDEO_PROFILE;
  },
  editVideo: id => {
    if (id) {
      return `/videos/${id}/edit`;
    }
    return EDIT_VIDEO;
  },
  deleteVideo: id => {
    if (id) {
      return `/videos/${id}/delete`;
    }
    return DELETE_VIDEO;
  },
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  me: ME,
  facebook: FB,
  facebookCallback: FB_CALLBACK,
  kakao: KAKAO,
  kakaoCallback: KAKAO_CALLBACK,
  insta: INSTA,
  instaCallback: INSTA_CALLBACK,
};

export default routes;