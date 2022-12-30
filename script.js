function h(evt) {
  evt.preventDefault();
  window.removeEventListener('touchstart', h, null);
  window.removeEventListener('click', h, null);
  const songs = ['song1.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3', 'song5.mp3', 'song6.mp3', 'song7.mp3']; // list of .mp3 files in the site root folder
  const index = Math.floor(Math.random() * songs.length); // generate a random index
  let song = new Audio(songs[index]); // create a new audio element
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

  function playNext() {
    // play another random .mp3 file when the current audio ends
    const nextIndex = Math.floor(Math.random() * songs.length); // generate a new random index
    fadeOut(song); // fade out the current audio
    song = new Audio(songs[nextIndex]); // create a new audio element
    fadeIn(song); // fade in the next audio
  }

  // attach event listeners to the audio element
  song.addEventListener('ended', playNext);
  song.addEventListener('error', playNext);

  // fade in the audio when it starts
  song.volume = 0;
  fadeIn(song);
}
window.addEventListener('touchstart', h);
window.addEventListener('click', h);
