const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const durationEl = document.getElementById("duration");
const currentTimeEl = document.getElementById("current-time");

// Music
const songs = [
  {
    name: "Ahh",
    displayName: "Ahh",
    artist: "Jesus Guys",
  },
  {
    name: "I wont go back",
    displayName: "I wont go back",
    artist: "Jesus People",
  },
  {
    name: "It's all about you, jesus",
    displayName: "It's all about you, jesus",
    artist: "Jesus Lovers",
  },
  {
    name: "Where-You-Are",
    displayName: "Where-You-Are",
    artist: "Wole Emmanuel",
  },
];

// Check if playing
let isPlaying = false;

// // create a pause button
// let pauseBtn = document.createElement("i");
// pauseBtn.className = "fas fa-pause main-button";
// pauseBtn.id = "play";
// pauseBtn.setAttribute("title", "Pause");

// Play
function playSong() {
  isPlaying = true;
  music.play();
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  //   playBtn.replaceWith(pauseBtn);
}

//Pause
function pauseSong() {
  isPlaying = false;
  music.pause();
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  //   pauseBtn.replaceWith(playBtn);
}

// Play or Pause Event Listener
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));
// pauseBtn.addEventListener("click", () =>
//   isPlaying ? pauseSong() : playSong()
// );

// Update Dom
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `images/${song.name}.avif`;
}

// Current Song
let songIndex = 0;

// Previous Song
function prevSong() {
  console.log(songIndex);
  if (songIndex == 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex--;
  }
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  if (songIndex == songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }
  console.log(songIndex);
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Select First Song
loadSong(songs[songIndex]);
// Update Progress bar and time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;

    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    // console.log(progressPercent);
    progress.style.width = `${progressPercent}%`;

    // Calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    console.log("minutes:", durationMinutes);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    console.log("seconds", durationSeconds);

    // Delay Switching duration Element to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    // Calculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    // console.log("minutes:", currentMinutes);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    // console.log("seconds", currentSeconds);
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set progress Bar
function setProgressBar(e) {
  //   console.log(e);
  const width = this.clientWidth;
  //   console.log("width", width);
  const clickX = e.offsetX;
  //   console.log("clickX", clickX);
  const { duration } = music;
  //   console.log(clickX / width);
  //   console.log((clickX / width) * duration);
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
