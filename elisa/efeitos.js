
const intro = document.querySelector('.intro');

// Remover a tela de introdução automaticamente após 2 segundos
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        intro.classList.add('hidden');
    }, 1400); // 2 segundos de delay
    
});
document.addEventListener('DOMContentLoaded', () => {
    const interBubble = document.querySelector('.interactive');
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
        // Suaviza o movimento, mas com uma resposta mais rápida
        curX += (tgX - curX) / 10; // Reduzi a suavização para deixar mais responsivo
        curY += (tgY - curY) / 10;

        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        
        // Chama a função de animação
        requestAnimationFrame(move);
    }

    // Atualiza as coordenadas do mouse
    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX - interBubble.offsetWidth / 2; // Centraliza o movimento
        tgY = event.clientY - interBubble.offsetHeight / 2;
    });

    // Inicia a animação
    move();
});
