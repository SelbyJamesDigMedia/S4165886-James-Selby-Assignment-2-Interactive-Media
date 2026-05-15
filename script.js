// most variables are declared at the top of the screen
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

//this starts the website with the repeat button turned off
let repeat = false
volumeValue.innerHTML = volumeSlider.value

//this removes the controls that originally come with the video
video.removeAttribute("controls");

//play/pause button function. I changed the colour of the button along with the image to give clearer indication of the button state
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

// carries out the play/pause function when the button is clicked
playPauseBtn.addEventListener("click", togglePlayPause);

// This function was included as a way of correcting the play/pause button state after the user fullsceens the video and manipulates controls within fullscreen mode
function checkPlayButtonStatus() {
  if (video.paused || video.ended) {
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png";
    playPauseBtn.style.backgroundColor = "#D9A84E";
  } else {
    playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png";
    playPauseBtn.style.backgroundColor = "#25A6D9";
  }
}

// carries out the play/pause button check every frame
video.addEventListener("timeupdate", checkPlayButtonStatus)

// simple function sets the time of the video back to the start (0)
function skipToStart() {
  video.currentTime = 0
}

skipToStartBtn.addEventListener("click", skipToStart)

// using code I found on this website: https://www.w3schools.com/jsref/jsref_random.asp I figured out how to select a random time from the video to place the user at
function selectRandomTime() {
  video.currentTime = Math.random() * video.duration
}

randomTimeBtn.addEventListener("click", selectRandomTime)

// using logic statements, I created this function where if the repeat button is sellected and the video has ended, the video time sets to 0 and resumes
function repeatVideo() {
  if (repeat === true && video.ended){
    video.currentTime = 0
    video.play();
  }
}

//this code is similar to the play/pause button but doesnt change the image
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

// instead of calling this funcion every frame, I can just call it when the video is ended for better optimisation
video.addEventListener("ended", repeatVideo)

//updates progress bar positioning
function updateProgressBar() {
  const value = (video.currentTime / video.duration) * 100;
  progressBar.style.width = value + "%";
}

video.addEventListener("timeupdate", updateProgressBar);


// taking logic from this website thread https://dev.to/alexparra/js-seconds-to-hh-mm-ss-22o6 I created a time format. "math.floor" allows for only whole numbers to be returned
// the time is divided by 60 for the amount of minutes and the "%" gives the remainder of seconds left after the time is divided by 60
function formatTime(time) {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)

  // this code returns minutes with seconds being converted to a string for the function ".padStart" to work.
  // ".padStart" works to place a "0" in front of a single digit value so that the text looks like a classic video time indicator
  return `${minutes}:${seconds.toString().padStart(2, "0")}`
}

// returns the time value of the video to the html text
function updateVideoTime() {
  videoTimeValue.innerHTML = formatTime(video.currentTime);
}

video.addEventListener("timeupdate", updateVideoTime)

// toggles the fullscreen button image and background colour when clicked
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

muteBtn.addEventListener("click", toggleAudio)

// this code allows the video to enter fullscreen mode
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    video.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

fullscreenBtn.addEventListener("click", toggleFullscreen);

// because the video volume only uses numbers from 0-1 I have to divide the value given from the volume slider by 100 to assign it
// altering the volume slider actively sends the correct volume value to the text on the left of the slider
// I also included some code which toggles the mute button status when the slider reaches 0
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