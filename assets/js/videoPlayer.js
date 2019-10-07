const videoContainer = document.getElementById('jsVideoPlayer');
const videoPlayer = document.querySelector('#jsVideoPlayer video');
const playBtn = document.getElementById('jsPlayBtn');
const volumeBtn = document.getElementById('jsVolumeBtn');
const fullScreenBtn = document.getElementById('jsFullScreen');
const totalTime = document.getElementById('jsTotalTime');
const currentTime = document.getElementById('jsCurrentTime');
const timeRange = document.getElementById('jsTimeRange');
const volumeRange = document.getElementById('jsVolume');

const registerView = () => {
  const videoId = window.location.href.split('/videos/')[1];
  fetch(`/api/${videoId}/view`, {
    method: 'POST',
  });
};

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = videoPlayer.volume;
  } else {
    volumeRange.value = 0;
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
  fullScreenBtn.removeEventListener('click', exitFullScreen);
  fullScreenBtn.addEventListener('click', goFullScreen);
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
}

function goFullScreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullScreen) {
    /* Firefox */
    videoContainer.mozRequestFullScreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    /* IE/Edge */
    videoContainer.msRequestFullscreen();
  }
  fullScreenBtn.removeEventListener('click', goFullScreen);
  fullScreenBtn.addEventListener('click', exitFullScreen);
  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
}

function toHHMMSS(seconds) {
  const secNum = parseInt(seconds, 10); // don't forget the second param
  let hours = Math.floor(secNum / 3600);
  let minutes = Math.floor((secNum - hours * 3600) / 60);
  let totalSeconds = secNum - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }

  if (hours === '00') {
    return `${minutes}:${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
}

function getCurrentTime() {
  currentTime.innerHTML = toHHMMSS(Math.floor(videoPlayer.currentTime));
  timeRange.value = Math.floor(videoPlayer.currentTime);
}

function setTotalTime() {
  totalTime.innerHTML = toHHMMSS(Math.floor(videoPlayer.duration));
  getCurrentTime();
  setInterval(getCurrentTime, 1000);
}

function handleEnded() {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleTimeRange(event) {
  videoPlayer.currentTime = event.target.value;
  currentTime.innerHTML = toHHMMSS(Math.floor(videoPlayer.currentTime));
}

function handleVolumeRange(event) {
  videoPlayer.muted = false;
  videoPlayer.volume = event.target.value;
  if (event.target.value >= 0.6) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (event.target.value >= 0.3) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else if (event.target.value == 0) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

// init 함수에서 이벤트 리스너를 호출
function init() {
  playBtn.addEventListener('click', handlePlayClick);
  volumeBtn.addEventListener('click', handleVolumeClick);
  fullScreenBtn.addEventListener('click', goFullScreen);
  videoPlayer.addEventListener('ended', handleEnded);
  volumeRange.addEventListener('input', handleVolumeRange);

  videoPlayer.onloadedmetadata = () => {
    setTotalTime();
    timeRange.max = Math.floor(videoPlayer.duration);
    timeRange.step = 1;
    timeRange.value = 0;
  };

  timeRange.addEventListener('input', handleTimeRange);
}

// Video Detail page에 위치하고 있다는 것을 확인하기 위하여
if (videoContainer) {
  init();
}
