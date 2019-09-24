import passport from 'passport';
import routes from '../routes';
import User from '../models/User';

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getJoin = (req, res) => res.render('join', {pageTitle: 'Join'});
export const postJoin = async (req, res, next) => {
  const {
    body: {name, email, password, password2},
  } = req;
  // check password, password2
  if (password !== password2) {
    res.status(400);
    res.render('join', {pageTitle: 'Join'});
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render('login', {pageTitle: 'Log in'});

export const postLogin = passport.authenticate('local', {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

// Github Login
export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: {id, avatar_url: avatarUrl, name, email},
  } = profile;
  try {
    const user = await User.findOne({email});
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      avatarUrl,
      githubId: id,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => res.redirect(routes.home);

// Facebook Login
export const facebookLogin = passport.authenticate('facebook');

export const facebookLoginCallback = (
  accessToken,
  refreshToken,
  profile,
  cb,
) => {
  console.log(accessToken, refreshToken, profile, cb);
};

export const postFacebookLogin = (req, res) => res.redirect(routes.home);

// Kakao Login
export const kakaoLogin = passport.authenticate('kakao', {
  failureRedirect: '#!/login',
});

export const kakaoLoginCallback = async (_, __, profile, done) => {
  const {
    _json: {
      id,
      profile_image: avatarUrl,
      nickname: name,
      kaccount_email: email,
    },
  } = profile;
  try {
    const user = await User.findOne({email});
    if (user) {
      user.kakaoId = id;
      user.save();
      return done(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      avatarUrl,
      kakaoId: id,
    });
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

export const postKakaoLogin = (req, res) => res.redirect(routes.home);

// Instagram Login
export const instaLogin = passport.authenticate('instagram');

// 인스타에서 이메일 정보를 주지 않음 -> 여기까지만
export const instaLoginCallback = (
  accessToken,
  refreshToken,
  profile,
  done,
) => {
  console.log(accessToken, refreshToken, profile, done);
};

export const postInstaLogin = (req, res) => res.redirect(routes.home);

// userRouter.js
export const users = (req, res) => res.render('users', {pageTitle: 'Users'});

export const getMe = (req, res) => {
  res.render('userDetail', {pageTitle: 'User Detail', user: req.user});
};

export const userDetail = async (req, res) => {
  const {
    params: {id},
  } = req;
  try {
    const user = await User.findById(id);
    res.render('userDetail', {pageTitle: 'User Detail', user});
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const editProfile = (req, res) =>
  res.render('editProfile', {pageTitle: 'Edit Profile'});
export const changePassword = (req, res) =>
  res.render('changePassword', {pageTitle: 'Change Password'});
