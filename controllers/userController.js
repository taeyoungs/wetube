import routers from '../router';

export const login = (req, res) => res.render('login', {pageTitle: 'Login'});
export const logout = (req, res) => res.render('logout', {pageTitle: 'Logout'});

export const getJoin = (req, res) => res.render('join', {pageTitle: 'Join'});
export const postJoin = (req, res) => {
  const {
    body: {name, email, password, password2},
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render('join', {pageTitle: 'Join'});
  } else {
    // To Do: Register User
    // To Do: Log user in
    res.redirect(routers.home);
  }
};

// userRouter.js
export const users = (req, res) => res.render('users', {pageTitle: 'Users'});
export const users_detail = (req, res) =>
  res.render('users_detail', {pageTitle: 'Users Detail'});
export const edit_profile = (req, res) =>
  res.render('edit_profile', {pageTitle: 'Edit Profile'});
export const change_password = (req, res) =>
  res.render('change_password', {pageTitle: 'Change Password'});
