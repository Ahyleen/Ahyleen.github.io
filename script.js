function h(evt) {
  if (evt.target.tagName === 'BUTTON') {
    // do not prevent default behavior if the target element is a button
    return;
  }
  evt.preventDefault();
  window.removeEventListener('touchstart', h, null);
  window.removeEventListener('click', h, null);
  const songs = ['song1.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3', 'song5.mp3', 'song6.mp3', 'song7.mp3']; // list of .mp3 files in the site root folder
  let currentIndex = Math.floor(Math.random() * songs.length); // generate a random index
  let song = new Audio(); // create a new audio element
  song.src = songs[currentIndex]; // set the src attribute
  song.load(); // load the audio file
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
    // play another random .mp3 file that was not played before
    let nextIndex = Math.floor(Math.random() * songs.length); // generate a new random index
    while (nextIndex === currentIndex) {
      // keep generating a new index until it is different from the current index
      nextIndex = Math.floor(Math.random() * songs.length);
    }
    currentIndex = nextIndex; // update the current index
    fadeOut(song); // fade out the current audio
    song = new Audio(); // create a new audio element
    song.src = songs[currentIndex]; // set the src attribute
    song.load(); // load the audio file
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
