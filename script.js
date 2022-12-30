function h(evt) {
  evt.preventDefault();
  window.removeEventListener('touchstart', h, null);
  window.removeEventListener('click', h, null);
  const songs = ['song1.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3', 'song5.mp3', 'song6.mp3', 'song7.mp3']; // list of .mp3 files in the site root folder
  let currentIndex = Math.floor(Math.random() * songs.length);
  let song = new Audio();
  song.src = songs[currentIndex];
  song.load();
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
    let nextIndex = Math.floor(Math.random() * songs.length);
    while (nextIndex === currentIndex) {
      nextIndex = Math.floor(Math.random() * songs.length);
    }
    currentIndex = nextIndex;
    fadeOut(song);
    song = new Audio();
    song.src = songs[currentIndex];
    song.load();
    fadeIn(song);
  }

  song.addEventListener('ended', playNext);
  song.addEventListener('error', playNext);

  song.volume = 0;
 
