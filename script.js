const video = document.querySelector("#custom-video-player");
const playPauseBtn = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const randomTimeBtn = document.querySelector("#random-time-btn");
const skipToStartBtn = document.querySelector("#skip-to-start-btn");
const progressBar = document.querySelector("#progress-bar-fill");
const repeatBtn = document.querySelector("#repeat-btn");
const fullscreenBtn = document.querySelector("#fullscreen-btn");
const muteBtn = document.querySelector("#mute-btn");
const muteImg = document.querySelector("#mute-img");
const volumeSlider = document.querySelector("#volume-slider");
const volumeValue = document.querySelector("#volume-value");
const videoTimeValue = document.querySelector("#video-time-value")

let repeat = false
volumeValue.innerHTML = volumeSlider.value

video.removeAttribute("controls");

function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
    playPauseBtn.style.backgroundColor = "#25A6D9";
  } else {
    video.pause();
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
    playPauseBtn.style.backgroundColor = "#D9A84E";
  }
}


playPauseBtn.addEventListener("click", togglePlayPause);

function checkPlayButtonStatus() {
  if (video.paused || video.ended) {
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
    playPauseBtn.style.backgroundColor = "#D9A84E";
  } else {
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
    playPauseBtn.style.backgroundColor = "#25A6D9";
  }
}

video.addEventListener("timeupdate", checkPlayButtonStatus)

function skipToStart() {
  video.currentTime = 0
}

skipToStartBtn.addEventListener("click", skipToStart)

function selectRandomTime() {
  video.currentTime = Math.random() * video.duration
}

randomTimeBtn.addEventListener("click", selectRandomTime)

function repeatVideo() {
  if (repeat === true && video.ended){
    video.currentTime = 0
    video.play();
  }
}

function toggleRepeat() {
  if (repeat === true){
    repeat = false
    repeatBtn.style.backgroundColor = "#D9A84E";
  } else {
    repeat = true
    repeatBtn.style.backgroundColor = "#D943A4";
  }
}


repeatBtn.addEventListener("click", toggleRepeat);

video.addEventListener("ended", repeatVideo)

function updateProgressBar() {
  const value = (video.currentTime / video.duration) * 100;
  progressBar.style.width = value + "%";
}


video.addEventListener("timeupdate", updateProgressBar);

function formatTime(time) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)

  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}
function updateVideoTime() {
  videoTimeValue.innerHTML = formatTime(video.currentTime);
}

video.addEventListener("timeupdate", updateVideoTime)

function toggleAudio(){
  if (video.muted) {
    video.muted = false;
    muteImg.src = "https://img.icons8.com/?size=100&id=OC2elREGfQ1m&format=png&color=000000";
    muteBtn.style.backgroundColor = "#D9A84E"
  } else {
    video.muted = true;
    muteImg.src = "https://img.icons8.com/?size=100&id=VJtVZHDCkhXn&format=png&color=000000";
    muteBtn.style.backgroundColor = "#EA1D25"
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

fullscreenBtn.addEventListener("click", toggleFullscreen);

volumeSlider.addEventListener("input", function () {
  video.volume = volumeSlider.value/100;
  volumeValue.innerHTML = this.value;
  if(volumeSlider.value == 0){
    muteImg.src = "https://img.icons8.com/?size=100&id=VJtVZHDCkhXn&format=png&color=000000";
    muteBtn.style.backgroundColor = "#EA1D25"
  } else {
    muteImg.src = "https://img.icons8.com/?size=100&id=OC2elREGfQ1m&format=png&color=000000";
    muteBtn.style.backgroundColor = "#D9A84E"
    video.muted = false;
  }
});

muteBtn.addEventListener("click", toggleAudio)