export const home = (req, res) => res.render('home', {pageTitle: 'Home'});

export const search = (req, res) => {
  const {
    query: {term: searchingBy},
  } = req;
  res.render('search', {pageTitle: 'Search', searchingBy});
};

// videoRouter.js
export const upload = (req, res) => res.render('upload', {pageTitle: 'Upload'});

export const videos = (req, res) => res.render('videos', {pageTitle: 'Videos'});

export const video_profile = (req, res) =>
  res.render('video_profile', {pageTitle: 'Video Profile'});

export const edit_video = (req, res) =>
  res.render('edit_video', {pageTitle: 'Edit Video'});

export const delete_video = (req, res) =>
  res.render('delete_video', {pageTitle: 'Delete Video'});
