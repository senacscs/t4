let vantaEffect;
let highlightFrequency = 1.0;
let midtoneFrequency = 0.5;
let lowlightFrequency = 0.3;
let baseFrequency = 0.005;

function initVanta() {
  vantaEffect = VANTA.FOG({
    el: "#vanta-bg",
    highlightColor: 0xff0000,
    midtoneColor: 0x00ff00,
    lowlightColor: 0x0000ff,
    baseColor: 0xffffff,
    blurFactor: 0.5,
    speed: 200,
    zoom: 10,
    scale: 20,
    scaleMobile: 4
  });
}

function colorCycle() {
// Cycle through rainbow colors at different frequencies
	vantaEffect.setOptions({
	  highlightColor: cycleColor(highlightFrequency),
	  midtoneColor: cycleColor(midtoneFrequency),
	  lowlightColor: cycleColor(lowlightFrequency),
	  baseColor: cycleColor(baseFrequency),
	});
	requestAnimationFrame(colorCycle);
}

function cycleColor(frequency) {
	const time = Date.now() * 0.001;
	const r = Math.sin(frequency * time + 0) * 127 + 128;
	const g = Math.sin(frequency * time + 2) * 127 + 128;
	const b = Math.sin(frequency * time + 4) * 127 + 128;
	return (r << 16) + (g << 8) + b;
}

function changeEffect(effect) {
  switch(effect) {
    case 'fog':
      vantaEffect.setOptions({
        //highlightColor: Math.random() * 0xFFFFFF,
        //midtoneColor: Math.random() * 0x0000AA,
        //lowlightColor: Math.random() * 0xAA0000,
        //baseColor: Math.random() * 0xFF0000,
        blurFactor: Math.random() * 1.5 + 0.2,
        speed: Math.random() * 3 + 0.1,
      });
      break;
  }
}

document.addEventListener("DOMContentLoaded", initVanta);
requestAnimationFrame(colorCycle);

// Fullscreen toggle functionality
const fullscreenToggle = document.getElementById('fullscreen-toggle');

fullscreenToggle.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch((err) => {
      console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
});

document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement) {
    fullscreenToggle.textContent = 'Exit Fullscreen';
  } else {
    fullscreenToggle.textContent = 'Toggle Fullscreen';
  }
});

var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});

