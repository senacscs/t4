
const intro = document.querySelector('.intro');

// Remover a tela de introdução automaticamente após 2 segundos
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        intro.classList.add('hidden');
    }, 1400); // 2 segundos de delay
    
});