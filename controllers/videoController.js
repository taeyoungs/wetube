export const home = (req, res) => res.render('home');
export const search = (req, res) => res.send('Search');

// videoRouter.js
export const videos = (req, res) => res.send('Videos');
export const upload = (req, res) => res.send('Upload');
export const video_profile = (req, res) => res.send('Video Profile');
export const edit_video = (req, res) => res.send('Edit Video');
export const delete_video = (req, res) => res.send('Delete Video');
