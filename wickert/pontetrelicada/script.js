// Escrita da barra inicial

const phrases = [
  "Confira nossas pontes e serviços disponíveis",
  "Conheça melhor a nossa empresa e nossos serviços",
  "Aqui você encontra as melhores pontes de palitos"
];

let currentPhrase = 0;
let currentChar = 0;
let isDeleting = false;
const textElement = document.querySelector('.texto-a-ser-exibido');
const typingSpeed = 70;
const deletingSpeed = 30;
const delayBetweenPhrases = 2000;

function type() {
  const fullText = phrases[currentPhrase];
  
  if (isDeleting) {
      textElement.textContent = fullText.substring(0, currentChar - 1);
      currentChar--;
      
      if (currentChar === 0) {
          isDeleting = false;
          currentPhrase = (currentPhrase + 1) % phrases.length; // Vai para a próxima frase
      }
  } else {
      textElement.textContent = fullText.substring(0, currentChar + 1);
      currentChar++;
      
      if (currentChar === fullText.length) {
          isDeleting = true;
          setTimeout(type, delayBetweenPhrases); // Pausa antes de apagar
          return;
      }
  }
  
  setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
}

document.addEventListener("DOMContentLoaded", function() {
  type(); // Inicia a animação quando a página carrega
});


//Opacidade da header

document.addEventListener('DOMContentLoaded', function() {
    const backgroundElement = document.getElementById('background');
  
    window.addEventListener('scroll', function() {
      if (window.scrollY > 0) {
        backgroundElement.style.opacity = '1';
      } else {
        backgroundElement.style.opacity = '0.7';
      }
    });
  });