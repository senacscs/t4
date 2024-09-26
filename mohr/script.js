/*Header*/
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
   
  const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 100;



// Texto pra Brilhar
class Particle {
    constructor(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 5 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = Math.random() * 3 - 1.5;
        const speedY = Math.random() * 3 - 1.5;
        particlesArray.push(new Particle(x, y, size, speedX, speedY));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();

// Seleciona o subtítulo
const subtitulo = document.querySelector('.subtitulo');

// Adiciona um listener para o evento de rolagem da página
window.addEventListener('scroll', function() {
  // Pega a posição do subtítulo em relação ao topo da página
  const subtituloOffsetTop = subtitulo.offsetTop;

  // Verifica se a página foi rolada o suficiente para o subtítulo "grudar"
  if (window.pageYOffset > subtituloOffsetTop) {
    subtitulo.classList.add('fixed'); // Adiciona a classe que o fixa no topo
  } else {
    subtitulo.classList.remove('fixed'); // Remove a classe se o scroll for para cima
  }
});

