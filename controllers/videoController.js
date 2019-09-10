import routers from '../router';
import Video from '../models/Video';

// HOME
export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render('home', {pageTitle: 'Home', videos});
  } catch (error) {
    console.log(error);
    res.render('home', {pageTitle: 'Home', videos: []});
  }
};

// SEARCH
export const search = (req, res) => {
  const {
    query: {term: searchingBy},
  } = req;
  res.render('search', {pageTitle: 'Search', searchingBy, videos});
};

// videoRouter.js

// UPLOAD - get, post
export const getUpload = (req, res) =>
  res.render('upload', {pageTitle: 'Upload'});
export const postUpload = async (req, res) => {
  // To Do: Upload and save video
  const {
    body: {title, description},
    file: {path},
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });
  res.redirect(routers.videoDetail(newVideo.id));
};

// VIDEO DETAIL
export const videoDetail = (req, res) =>
  res.render('videoDetail', {pageTitle: 'Video Detail'});

export const editVideo = (req, res) =>
  res.render('editVideo', {pageTitle: 'Edit Video'});

export const deleteVideo = (req, res) =>
  res.render('deleteVideo', {pageTitle: 'Delete Video'});
