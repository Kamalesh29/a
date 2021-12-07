
var audioTrack = WaveSurfer.create({
    container: ".audio",
    waveColor: "blue",
    progressColor: "red",
    barWidth: 2,
});
let audioSet = "hey"

const playBtn = document.querySelector(".play-btn");
const stopBtn = document.querySelector(".stop-btn");
const muteBtn = document.querySelector(".mute-btn");
const volumeSlider = document.querySelector(".volume-slider");
const forward = document.querySelector(".forward-btn");
const backward = document.querySelector(".backward-btn");
const trackName = document.querySelector(".track-name");
const textArea = document.getElementById("textArea");
const saveText = document.getElementById("saveText");

function setAudio() {
  if(event.target.parentElement.id) {
    audioSet = event.target.parentElement.id;
  }
  if(event.target.id) {
    audioSet = event.target.id;
  }
  trackName.innerHTML = audioSet;
  audioTrack.load(window.location.origin+'/audiolyric/audio/'+audioSet+'.mp3');
  setTimeout(()=> {
    document.querySelector(".play-btn").click();
  },2000)
}

audioTrack.load(window.location.origin+'/audiolyric/audio/'+audioSet+'.mp3');

let audioList = ['hey', 'summer', 'ukulele', 'track1','track5'];

backward.addEventListener('click', () => {
  let getAudio;
  let findAudio = document.querySelector('.track-name').textContent;
  findAudio = findAudio.split('.')[0];
  let indexAudio = audioList.indexOf(findAudio);
  let findList = indexAudio - 1;
  if (findList == -1) {
    findList = audioList.length - 1;
    getAudio = audioList[findList];
  } else {
    getAudio = audioList[findList];
  }
  audioTrack.load(window.location.origin+'/audiolyric/audio/'+getAudio+'.mp3');
  trackName.innerHTML = getAudio;
  setTimeout(()=> {
    document.querySelector(".play-btn").click();
  },2000)
});

forward.addEventListener('click', () => {
  let getAudio;
  let findAudio = document.querySelector('.track-name').textContent;
  findAudio = findAudio.split('.')[0];
  let indexAudio = audioList.indexOf(findAudio);
  let findList = indexAudio + 1;
  if (audioList.length == findList) {
    findList = 0;
    getAudio = audioList[findList];
  } else {
    getAudio = audioList[findList];
  }
  audioTrack.load(window.location.origin+'/audiolyric/audio/'+getAudio+'.mp3');
  trackName.innerHTML = getAudio;
  setTimeout(()=> {
    document.querySelector(".play-btn").click();
  },2000)
});

playBtn.addEventListener("click", () => {
  audioTrack.playPause();

  if (audioTrack.isPlaying()) {
    playBtn.classList.add("playing");
  } else {
    playBtn.classList.remove("playing");
  }
});

stopBtn.addEventListener("click", () => {
  audioTrack.stop();
  playBtn.classList.remove("playing");
});

volumeSlider.addEventListener("mouseup", () => {
  changeVolume(volumeSlider.value);
});

const changeVolume = (volume) => {
  if (volume == 0) {
    muteBtn.classList.add("muted");
  } else {
    muteBtn.classList.remove("muted");
  }

  audioTrack.setVolume(volume);
};

muteBtn.addEventListener("click", () => {
  if (muteBtn.classList.contains("muted")) {
    muteBtn.classList.remove("muted");
    audioTrack.setVolume(0.5);
    volumeSlider.value = 0.5;
  } else {
    audioTrack.setVolume(0);
    muteBtn.classList.add("muted");
    volumeSlider.value = 0;
  }
});

saveText.onclick = function(){
  localStorage.setItem("textArea",textArea.value);
}

textArea.value = localStorage.getItem("textArea")