import axios from 'axios';

const commnetForm = document.getElementById('jsAddComment');
const commentNumber = document.getElementById('jsCommentNumber');
const commentList = document.getElementById('jsCommentList');
const deleteBtn = document.getElementsByClassName('deleteCommentBtn');

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = comment => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.innerHTML = comment;
  li.appendChild(span);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async comment => {
  const videoId = window.location.href.split('/videos/')[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: 'POST',
    data: {
      comment,
    },
  });
  if (response.status === 200) {
    addComment(comment);
  }
};

const handleComment = event => {
  event.preventDefault();
  const commentInput = commnetForm.querySelector('input');
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = '';
};

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteComment = th => {
  th.remove();
  decreaseNumber();
};

const axiosDelComment = async (commentId, th) => {
  const videoId = window.location.href.split('/videos/')[1];
  const response = await axios({
    url: `/api/${videoId}/deleteCmt`,
    method: 'POST',
    data: {commentId},
  });
  if (response.status === 200) {
    deleteComment(th);
    console.log(th);
  }
};

const handleDelete = event => {
  const commentId = event.target.getAttribute('data-id');
  const parentli = event.target.parentElement.parentElement;
  axiosDelComment(commentId, parentli);
};

function init() {
  commnetForm.addEventListener('submit', handleComment);
  for (let i = 0; i < deleteBtn.length; i++) {
    deleteBtn[i].addEventListener('click', handleDelete);
  }
}

if (commnetForm) {
  init();
}
