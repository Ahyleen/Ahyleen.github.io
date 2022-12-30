function h(evt) {
  evt.preventDefault();
  window.removeEventListener('touchstart', h, null);
  window.removeEventListener('click', h, null);
  const song = new Audio('song.mp3');
  song.loop = true;
  document.querySelector('.before').remove();
  document.querySelector('.after').style.display = 'block';
  song.play();
}

const links = document.querySelectorAll('a');
for (let link of links) {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    window.location = this.href;
  });
}

window.addEventListener('touchstart', h);
