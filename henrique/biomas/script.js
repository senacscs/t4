const layers = document.querySelectorAll('.layer');

function parallax() {
  const y = window.scrollY;
  for (let i = 1; i < layers.length; i++) {
    layers[layers.length-i].style.transform = `translateY(${(i*0.1) * y}px)`;
  }
}

window.addEventListener('scroll', parallax, false);
