const videoContainer = document.getElementById('jsVideoPlayer');
const videoPlayer = document.querySelector('#jsVideoPlayer video');
const playBtn = document.getElementById('jsPlayBtn');

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
  } else {
    videoPlayer.pause();
  }
}

// init 함수에서 이벤트 리스너를 호출
function init() {
  playBtn.addEventListener('click', handlePlayClick);
}

if (videoContainer) {
  init();
}
