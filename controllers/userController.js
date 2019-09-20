import passport from 'passport';
import routers from '../router';
import User from '../models/User';

export const logout = (req, res) => {
  // To Do: Process Log Out
  res.redirect(routers.home);
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
      res.redirect(routers.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render('login', {pageTitle: 'Log in'});

export const postLogin = passport.authenticate('local', {
  failureRedirect: routers.login,
  successRedirect: routers.home,
});

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: {id, avatar_url, name, email},
  } = profile;
  try {
    const user = User.find({email});
    if (user) {
      user.githubId = id;
      User.save();
      return cb(null, user);
    }
    const newUser = User.create({
      email,
      name,
      avatarUrl: avatar_url,
      githubId: id,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => res.redirect(routers.home);

// userRouter.js
export const users = (req, res) => res.render('users', {pageTitle: 'Users'});
export const userDetail = (req, res) =>
  res.render('userDetail', {pageTitle: 'User Detail'});
export const editProfile = (req, res) =>
  res.render('editProfile', {pageTitle: 'Edit Profile'});
export const changePassword = (req, res) =>
  res.render('changePassword', {pageTitle: 'Change Password'});
