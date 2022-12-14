function h(evt) {
  evt.preventDefault();
  window.removeEventListener('touchstart', h, null);
  window.removeEventListener('click', h, null);
  const songs = ['song1.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3', 'song5.mp3', 'song6.mp3', 'song7.mp3']; // list of .mp3 files in the site root folder
  const index = Math.floor(Math.random() * songs.length); // generate a random index
  const song = new Audio(songs[index]); // create a new audio element
  document.querySelector('.before').remove();
  document.querySelector('.after').style.display = 'block';
  song.addEventListener('ended', function() {
    // play another random .mp3 file when the current audio ends
    const nextIndex = Math.floor(Math.random() * songs.length); // generate a new random index
    song.src = songs[nextIndex]; // set the src attribute to the new .mp3 file
    song.play(); // play the audio
  });
  song.play();
}
window.addEventListener('touchstart', h);
window.addEventListener('click', h);
