export const home = (req, res) => res.render('home');
export const search = (req, res) => res.send('Search');

// videoRouter.js
export const videos = (req, res) => res.render('videos');
export const upload = (req, res) => res.render('upload');
export const video_profile = (req, res) => res.render('video_profile');
export const edit_video = (req, res) => res.render('edit_video');
export const delete_video = (req, res) => res.render('delete_video');
