const songs = ['song1.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3', 'song5.mp3', 'song6.mp3', 'song7.mp3']; // list of .mp3 files in the site root folder
const audioElements = []; // array to store audio elements

for (const song of songs) {
  // create a new audio element for each song
  const audio = new Audio(song);
  audio.preload = 'auto'; // set the preload attribute to 'auto'
  audioElements.push(audio);
}

function h(evt) {
  evt.preventDefault();
  window.removeEventListener('touchstart', h, null);
  window.removeEventListener('click', h, null);
  const index = Math.floor(Math.random() * audioElements.length); // generate a random index
  let audio = audioElements[index]; // get the audio element at the random index
  document.querySelector('.before').remove();
  document.querySelector('.after').style.display = 'block';

  function fadeOut(audio) {
    if (audio.volume > 0) {
      audio.volume -= 0.1;
      setTimeout(function() {
        fadeOut(audio);
      }, 100);
    } else {
      audio.pause();
    }
  }

  function fadeIn(audio) {
    if (audio.volume < 1) {
      audio.volume += 0.1;
      setTimeout(function() {
        fadeIn(audio);
      }, 100);
    } else {
      audio.play();
    }
  }

  audio.addEventListener('ended', function() {
    // play another random .mp3 file when the current audio ends
    const nextIndex = Math.floor(Math.random() * audioElements.length); // generate a new random index
    fadeOut(audio); // fade out the current audio
    audio = audioElements[nextIndex]; // get the audio element at the random index
    fadeIn(audio); // fade in the next audio
  });
  audio.play();
}
window.addEventListener('touchstart', h);
window.addEventListener('click', h);
