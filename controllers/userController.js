export const login = (req, res) => res.render('login', {pageTitle: 'Login'});
export const logout = (req, res) => res.render('logout', {pageTitle: 'Logout'});
export const join = (req, res) => res.render('join', {pageTitle: 'Join'});

// userRouter.js
export const users = (req, res) => res.render('users', {pageTitle: 'Users'});
export const users_detail = (req, res) =>
  res.render('users_detail', {pageTitle: 'Users Detail'});
export const edit_profile = (req, res) =>
  res.render('edit_profile', {pageTitle: 'Edit Profile'});
export const change_password = (req, res) =>
  res.render('change_password', {pageTitle: 'Change Password'});
