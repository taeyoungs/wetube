import routes from '../routes';
import Video from '../models/Video';
import Comment from '../models/Comment';

// HOME
export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({createdAt: 'desc'});
    res.render('home', {pageTitle: 'Home', videos});
  } catch (error) {
    console.log(error);
    res.render('home', {pageTitle: 'Home', videos: []});
  }
};

// SEARCH
export const search = async (req, res) => {
  const {
    query: {term: searchingBy},
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: {$regex: searchingBy, $options: 'i'},
    });
  } catch (error) {
    console.log(error);
  }
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
    file: {location},
  } = req;
  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

// VIDEO DETAIL
export const videoDetail = async (req, res) => {
  const {
    params: {id},
  } = req;

  try {
    const video = await Video.findById(id)
      .populate('creator')
      .populate('comments');
    // const commnetList = await Comment.find({id: video.id});
    // console.log(commnetList);
    res.render('videoDetail', {pageTitle: video.title, video});
  } catch (error) {
    res.redirect(routes.home);
  }
};

// EDIT VIDEO - GET
export const getEditVideo = async (req, res) => {
  const {
    params: {id},
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      res.render('editVideo', {pageTitle: `Edit ${video.title}`, video});
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

// EDIT VIDEO - POST
export const postEditVideo = async (req, res) => {
  const {
    params: {id},
    body: {title, description},
  } = req;
  try {
    await Video.findOneAndUpdate({_id: id}, {title, description});
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: {id},
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      const index = req.user.videos.indexOf(id);
      req.user.videos.splice(index, 1);
      req.user.save();
      await Video.findOneAndRemove({_id: id});
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

export const postRegisterView = async (req, res) => {
  const {
    params: {id},
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postAddComment = async (req, res) => {
  const {
    params: {id},
    body: {comment},
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postDeleteComment = async (req, res) => {
  const {
    // Video ID
    params: {id},
    // Comment Id
    body: {commentId},
  } = req;
  try {
    await Comment.findOneAndDelete({_id: commentId});
    const video = await Video.findById(id);
    const index = video.comments.indexOf(commentId);
    video.comments.splice(index, 1);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
